import Mongoose from "server/db/Mongoose";
import moment from "moment"
const logger = require('logat');
const passportLib = require('server/lib/passport');
//Mongoose.Post.findOne({_id:'5e6b377260ee8707805367b6'})    .populate('token')    .then(console.log)

module.exports.controller = function (app) {

    function bodyToWhere(body) {
        if (!body.where) body.where = {};
        body.where.published = true;
        for(const f in body.where){
            if(!body.where[f]) delete body.where[f];
        }
        if (body.where.text) {
            body.where.$or =[{text:new RegExp(body.where.text, 'i')},{header:new RegExp(body.where.text, 'i')},]
            delete body.where.text;
        } else {
            delete body.where.text;
        }
        return body.where;
    }

    app.post('/api/post/search', (req, res) => {
        const filter = bodyToWhere(req.body);
        //logger.info(JSON.stringify(filter))
        Mongoose.Post.find(filter)
            .sort({createdAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .populate(Mongoose.Post.population)
            .then(items => res.send(items))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/search/count', (req, res) => {
        const filter = bodyToWhere(req.body);
        Mongoose.Post.countDocuments(filter)
            .then(count => res.send({count}))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/create', passportLib.isAdmin, async (req, res) => {
        const user = req.session.userId;
        const header = 'Новость ' + moment().format('YYYY-MM-DD HH:mm');
        Mongoose.Post.create({user, header, type: req.body.type}).then(post => res.send(post))
    });

    app.post('/api/post/:id/image-preview/:image', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .then(post => {
                post.preview = req.params.image;
                post.save().then(p=>res.send(p));
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .then(post => {
                post.images = post.images.concat(req.body.images);
                post.save();
                post.editable = true;
                res.send(post)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/post/view/:id', (req, res) => {
        Mongoose.Post.findById(req.params.id)
            .populate(Mongoose.Post.population)
            .then(post => {
                post.views++;
                post.save()
                    .then(p => {
                        p.editable = req.session.admin;
                        res.send(p)
                    })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.get('/api/post/share/:id', (req, res) => {
        Mongoose.Post.findById(req.params.id)
            .populate(Mongoose.Post.population)
            .then(post => res.render('post', {
                header: post.header,
                text: post.text,
                image: req.protocol + '://' + req.get('host') + (post.image ? post.image.path : '/logo.svg'),
                url: req.protocol + '://' + req.get('host') + '/post/' + post.id
            }))
            .catch(e => res.send(app.locals.sendError({error: 404, message: e.message})))
    });

    app.post('/api/post/:id/delete', passportLib.isAdmin, async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                post.delete();
                res.sendStatus(200);
            })
    });

    app.post('/api/post/:id/update', passportLib.isAdmin, async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                post.header = req.body.header;
                post.text = req.body.text;
                post.published = req.body.published;
                //.replace(/(?:\r\n|\r|\n)/g,'<br/>');
                //post.published = true;
                post.ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                post.save();
                res.send({ok: 200});
                app.locals.socketSend('post-update');
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
        ;

    });


}
;
