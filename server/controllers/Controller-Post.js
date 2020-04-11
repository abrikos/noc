import Mongoose from "server/db/Mongoose";
import moment from "moment"
const logger = require('logat');
const passportLib = require('server/lib/passport');
//Mongoose.Post.findOne({_id:'5e6b377260ee8707805367b6'})    .populate('token')    .then(console.log)

module.exports.controller = function (app) {

    app.post('/api/post/search', (req, res) => {
        Mongoose.Post.find(req.body.where)
            .sort({createdAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .populate(Mongoose.Post.population)
            .then(items => res.send(items))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/search/count', (req, res) => {
        Mongoose.Post.countDocuments(req.body.where)
            .then(count => res.send({count}))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/post/create', passportLib.isAdmin, async (req, res) => {
        const user = req.session.userId;
        const header = 'Новость ' + moment().format('YYYY-MM-DD HH:mm');
        Mongoose.Post.create({user, header, type: req.body.type}).then(post => res.send(post))
    });

    app.post('/api/post/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Post.findById(req.params.id)
            .populate('token')
            .then(post => {
                if (!req.session.admin) return res.status(403).send();
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
