import Mongoose from "server/db/Mongoose";
import moment from "moment"

const logger = require('logat');
const passportLib = require('server/lib/passport');
const ogs = require('open-graph-scraper');
//Mongoose.post.findOne({_id:'5e6b377260ee8707805367b6'})    .populate('token')    .then(console.log)

module.exports.controller = function (app) {

    function bodyToWhere(body) {
        if (!body.where) body.where = {};

        body.where.published = true;
        for (const f in body.where) {
            if (body.where[f] === null) delete body.where[f];
        }
        if (body.where.text) {
            body.where.$or = [{text: new RegExp(body.where.text, 'i')}, {header: new RegExp(body.where.text, 'i')},]
            delete body.where.text;
        } else {
            delete body.where.text;
        }
        return body.where;
    }

    app.post('/api/post/search', (req, res) => {
        const filter = bodyToWhere(req.body);

        Mongoose.post.find(filter)
            .sort({createdAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .populate(Mongoose.post.population)
            .then(items => res.send(items))
            .catch(e => res.send(app.locals.sendError(e)))
    });

    app.post('/api/post/search/count', (req, res) => {
        const filter = bodyToWhere(req.body);
        Mongoose.post.countDocuments(filter)
            .then(count => res.send({count}))
            .catch(e => res.send(app.locals.sendError(e)))
    });

    app.post('/api/post/create', passportLib.isAdmin, async (req, res) => {
        const user = req.session.userId;
        const header = 'Новость ' + moment().format('YYYY-MM-DD HH:mm');
        Mongoose.post.create({user, header}).then(post => res.send(post))
    });

    function getMeta(url, cb) {
        ogs({url}, (e, r, re) => {
            cb(r)
        })
    }

    //getMeta('http://192.168.2.1/admin/index.html#/home', r=>{    })

    app.post('/api/post/create-from-link', passportLib.isAdmin, async (req, res) => {
        const user = req.session.userId;
        getMeta(req.body.smiLink, r => {
            if (!r.ogTitle) return res.sendStatus(404);
            Mongoose.post.create({user, imgUrl: r.ogImage.url, header: r.ogTitle, text: r.ogDescription, published: true, isMassMedia: true, url: req.body.smiLink})
                .then(post => res.send(post))
        })
    });

    app.post('/api/post/:id/image-preview/:image', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({message: 'Wrong id'}))
        Mongoose.post.findById(req.params.id)
            .then(post => {
                post.preview = req.params.image;
                post.save().then(p => res.send(p));
            })
            .catch(e => res.send(app.locals.sendError(e)))
    });

    app.post('/api/post/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({message: 'Wrong id'}))
        Mongoose.post.findById(req.params.id)
            .then(post => {
                post.images = post.images.concat(req.body.images);
                post.save();
                post.editable = true;
                res.send(post)
            })
            .catch(e => res.send(app.locals.sendError(e)))
    });

    app.post('/api/post/:id/delete', passportLib.isAdmin, async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({message: 'Wrong id'}))
        Mongoose.post.findById(req.params.id)
            .populate('token')
            .then(post => {
                post.delete();
                res.sendStatus(200);
            })
    });

}
;
