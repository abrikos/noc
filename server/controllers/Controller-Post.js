import Mongoose from "server/db/Mongoose";

const transliterate = require("transliterate");
const jsonFeedToRSS = require('jsonfeed-to-rss');
const {Feed} = require('feed');

const passportLib = require('server/lib/passport');
const passport = require('passport');
const logger = require('logat');
const striptags = require('striptags');
//Mongoose.Post.findOne({_id:'5e6b377260ee8707805367b6'})    .populate('token')    .then(console.log)

module.exports.controller = function (app) {
    app.get('/rubric/tags', (req, res) => {
        Mongoose.Rubric.find()
            .then(items => {
                for (const item of items) {
                    item.tag = transliterate(item.name).toLowerCase().replace(' ', '_');
                    item.save()
                }
            });
        res.send({ok: 200})
    });

    app.post('/api/rubric/href/create', (req, res) => {
        const types = [];
        if (Mongoose.Types.ObjectId.isValid(req.body.rubric)) types.push(req.body.rubric);
        if (Mongoose.Types.ObjectId.isValid(req.body.category)) types.push(req.body.category);
        if (Mongoose.Types.ObjectId.isValid(req.body.root)) types.push(req.body.root);
        for (const key of Object.keys(req.body.options)) {
            types.push(key);
            for (const val of req.body.options[key]) {
                types.push(val)
            }
        }

        Mongoose.Rubric.find({_id: {$in: types}})
            .sort({order: -1})
            .then(rubrics => {
                const hrefTypes = [rubrics.find(r => r.id === req.body.rubric), rubrics.find(r => r.id === req.body.category), rubrics.find(r => r.id === req.body.root)].filter(t => !!t).map(t => t.tag);
                const options = {};
                for (const key of Object.keys(req.body.options)) {
                    const keyArr = [];
                    const keyRec = rubrics.find(r => r.id === key);
                    for (const val of req.body.options[key]) {
                        const valRec = rubrics.find(r => r.id === val);
                        keyArr.push(valRec.tag)
                    }
                    options[keyRec.tag] = keyArr;
                }

                const href = `/search/${hrefTypes[0]}?category=${hrefTypes.slice(1).join('/')}&${new URLSearchParams(options).toString()}`;
                res.send({href, options})
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/rubric', (req, res) => {
        if (!Object.keys(req.body).length) return res.send(app.locals.sendError({error: 500, message: 'Wrong rubric filter'}))
        Mongoose.Rubric.find(req.body)
            .populate('children')
            .then(r => res.send(r))
            .catch(e => res.sendStatus(404))
    });

    app.post('/api/rubric/:id/view', (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Rubric.findById(req.params.id)
            .then(r => res.send(r))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/rubric/options', (req, res) => {
        const ids = req.body.ids || [];
        Mongoose.Rubric.find({parent: {$in: ids}})
            .then(items => res.send(items))
    });

    function bodyToWhere(body) {
        if (!body.where) body.where = {};
        body.where.published = true;

        let type;
        if (body.where.root && body.where.root !== '0') type = body.where.root;
        if (body.where.subcat && body.where.subcat !== '0') type = body.where.subcat;
        if (body.where.rubric && body.where.rubric !== '0') type = body.where.rubric;
        if (type) {
            body.where.types = {$in: type}
        }
        delete body.where.root;
        delete body.where.subcat;
        delete body.where.rubric;

        if (body.where.options) {
            let opts = [];
            for (const opt of Object.keys(body.where.options)) {
                opts = opts.concat(body.where.options[opt]);
            }
            if (opts.length) {
                body.where.options = {$in: opts};
            } else {
                delete body.where.options;
            }
        }


        if (body.where.priceLo || body.where.priceHi) body.where.$and = [];
        if (body.where.priceLo) body.where.$and.push({price: {$gte: parseInt(body.where.priceLo)}});
        if (body.where.priceHi) body.where.$and.push({price: {$lt: parseInt(body.where.priceHi)}});
        delete body.where.priceLo;
        delete body.where.priceHi;

        if (body.where.text) {
            body.where.text = new RegExp(body.where.text)
        } else {
            delete body.where.text;
        }
        return body.where;
    }

    app.post('/api/post/search', (req, res) => {
        const filter = bodyToWhere(req.body);
        Mongoose.Post.find(filter)
            .sort({payment: -1, updatedAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .populate(Mongoose.Post.population)
            .then(items => res.send(sortPostByPayment(items)))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/my', (req, res) => {
        const filter = {};
        if (req.session.userId) {
            filter.user = req.session.userId;
        } else if (req.body.tokens) {
            filter.name = {$in: req.body.tokens};
        } else {
            return res.send([])
        }

        Mongoose.Token.find(filter)
            .sort({updatedAt: -1})
            .populate([{path: 'post', populate: Mongoose.Post.population}])
            .then(tokens => {
                const posts = sortPostByPayment(tokens.map(t => t.post));
                res.send(posts.map(p => p.id))
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/post/search/count', (req, res) => {
        Mongoose.Post.countDocuments(bodyToWhere(req.body))
            .then(count => res.send({count}))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    function sortPostByPayment(its) {
        const items = its.filter(i => !!i);
        const payments = items.filter(i => i.payment).sort((b, a) => (a.payment.tariff.multiplier > b.payment.tariff.multiplier) ? 1 : ((a.payment.tariff.multiplier < b.payment.tariff.multiplier) ? -1 : 0));
        const plain = items.filter(i => !i.payment);
        return payments.concat(plain)
    }


    app.get('/api/rss', (req, res) => {
        const filter = {published: true};
        Mongoose.Post.find(filter)
            .sort({payment: -1, updatedAt: -1,})
            //.sort([['payment', -1],['createdAt', -1]])
            .limit(parseInt(req.query.limit) || 10)
            .populate(Mongoose.Post.population)
            .then(async posts => {
                const site = req.protocol + '://' + req.hostname;
                const json = {
                    title: "Беру14.ру",
                    description: "Бери 14",
                    id: site,
                    link: site,
                    language: "ru", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
                    image: site + "/logo.png",
                    favicon: site + "/logo.png",
                    //copyright: "All rights reserved 2013, John Doe",
                    updated: new Date(), // optional, default = today
                    generator: "awesome", // optional, default = 'Feed for Node.js'
                    feedLinks: {
                        //json: "https://example.com/json",
                        atom: site + "/api/rss",
                    },
                    /*author: {
                        name: "John Doe",
                        email: "johndoe@example.com",
                        link: "https://example.com/johndoe"
                    }*/
                }
                res.set('Content-Type', 'application/rss+xml');
                const feed = new Feed(json);
                for (const p of posts) {
                    feed.addItem({
                        date: p.updatedAt,
                        title: p.types.concat(p.options).map(o => o.name).join(', '),
                        content: p.text,
                        url: site + "/post/" + p.id,
                        link: site + "/post/" + p.id,
                        id: site + "/post/" + p.id,
                        image: site + p.images[p.images.length - 1],
                    })
                }
                res.send(feed.rss2())
                //res.send(sortPostByPayment(posts))
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/post/create', async (req, res) => {
        const types = await breadcrumbs(req.body.type);
        req.body.types = types.map(r => r.id);
        const user = req.session.userId;
        Mongoose.Post.create(req.body).then(post => {
            Mongoose.Token.create({post, user})
                .then(token => {
                    res.send({post, token})
                })
        })

    });

    app.post('/api/post/view/:id', (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate(Mongoose.Post.population)
            .populate('token')
            .then(post => {
                post.views++;
                post.save()
                    .then(p => {
                        p.editable = checkAccess(req, post);
                        p.token = null;
                        res.send(p)
                    })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/upload/:id', async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                if (!checkAccess(req, post)) return res.status(401).send();
                if (req.files && Object.keys(req.files).length) {
                    if (!req.files) return res.send(app.locals.sendError({error: 500, message: 'No files uploaded'}));
                    if (!req.files.image) return res.send(app.locals.sendError({error: 500, message: 'No files uploaded'}));
                    if (!req.files.image.mimetype.match('image')) return res.send(app.locals.sendError({error: 500, message: 'Wrong images uploaded'}));
                    const match = req.files.image.mimetype.match(/\/([a-z]+)/);
                    Mongoose.Image.create({post, type: match[1]})
                        .then(file => req.files.image.mv(`.${file.path}`, function (err) {
                            if (err) return res.send({error: 500, message: err})
                            res.send(file)
                            /*post.populate('images').execPopulate((e, p)=>{
                                res.send(p.images)
                            })*/
                        }))
                        .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
                }
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/cookie/:id', (req, res) => {
        Mongoose.Token.findOne({name: req.params.id})
            .populate([{path: 'post', populate: Mongoose.Post.population}])
            .then(token => {
                token.post.editable = true;
                res.send(token.post)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.get('/api/post/share/:id', (req, res) => {
        Mongoose.Post.findById(req.params.id)
            .populate(Mongoose.Post.population)
            .then(post => res.render('post', {
                text: post.text,
                types: post.types.map(r => r.name).join(', '),
                image: post.images[post.images.length - 1] && req.protocol + '://' + req.get('host') + post.images[post.images.length - 1].path,
                url: req.protocol + '://' + req.get('host') + '/post/' + post.id
            }))
            .catch(e => res.send(app.locals.sendError({error: 404, message: e.message})))
    });

    app.post('/api/post/check/editable/:id', async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                const editable = checkAccess(req, post);
                res.send({editable});
            })
    });

    app.post('/api/post/delete/:id', async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                const editable = checkAccess(req, post);
                if (editable || req.session.isAdmin) {

                    post.delete();
                }
                res.sendStatus(200);
            })
    });

    app.post('/api/post/image/delete', async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.body.img.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong ID'}))
        Mongoose.Post.findById(req.body.img.post)
            .populate('token')
            .then(post => {
                const editable = checkAccess(req, post);
                if (editable || req.session.isAdmin) {
                    Mongoose.Image.findById(req.body.img.id)
                        .then(img => {
                            img.delete()
                        })
                    res.sendStatus(200);
                } else {
                    res.sendStatus(403)
                }

            })
    });

    function checkAccess(req, post) {
        if (!post) return false;
        const user = req.session.userId;
        const tokens = req.body.tokens ? typeof req.body.tokens === 'object' ? req.body.tokens : req.body.tokens.split(',') : [];
        console.log(tokens, post.token.name)
        return tokens.includes(post.token.name) || (post.token.user && post.token.user.equals(user)) || req.session.isAdmin;
    }

    app.post('/api/post/update/:id', async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                if (!checkAccess(req, post)) return res.status(401).send();
                post.phone = req.body.phone;
                post.text = striptags(req.body.text)
                //.replace(/(?:\r\n|\r|\n)/g,'<br/>');
                post.isDelivery = !!req.body.isDelivery;
                post.price = parseInt(req.body.price) || 0;
                if (!post.phone) return res.send({error: 500, message: 'Телефон обязателен'});
                post.published = true;
                post.ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                post.save();
                res.send({ok: 200});
                app.locals.socketSend('post-update');
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
        ;

    });


    app.post('/api/rubric/breadcrumbs', async (req, res) => {
        res.send(await breadcrumbs(req.body.id))
    });

    app.post('/api/rubric/create', (req, res) => {
        console.log(req.body)
        res.sendStatus(200)
    });

    async function breadcrumbs(id) {
        const items = [];

        async function recurse(id) {
            if (!Mongoose.Types.ObjectId.isValid(id)) return {error: 404, message: 'Wrong Id'}
            const item = await Mongoose.Rubric.findById(id);
            if (!item) return;
            items.push(item);
            if (item.parent) {
                await recurse(item.parent)
            }
        }

        await recurse(id);
        return items;
    }

}
;
