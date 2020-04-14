import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//const passport = require('passport');

//Mongoose.Meeting.find({}).then(console.log)


module.exports.controller = function (app) {

    app.post('/api/edition/:id/update', (req, res) => {
        Mongoose.Edition.findById(req.params.id)
            .populate(['image','images'])
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/edition/list', (req, res) => {
        Mongoose.Edition.find()
            .sort({createdAt:-1})
            .populate(['image','images'])
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/admin/edition/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose.Edition.findById(req.params.id)
            .then(r => {
                for(const f of Object.keys(req.body)){
                    r[f] = req.body[f]
                }
                r.save();
                res.sendStatus(200);
            })
    });
    app.post('/api/admin/edition/create', passportLib.isAdmin, (req, res) => {
        Mongoose.Edition.create(req.body)
            .populate(['image','images'])
            .then(r => {
                console.log(r)
                res.send(r);
            })
    });
    app.post('/api/admin/edition/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Edition.findById(req.params.id)

            .then(model => {
                model.images = model.images.concat(req.body.images);

                model.save()
                model.populate(['image','images']).execPopulate((e,m)=>{
                    res.send(m)
                })



            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });
    app.post('/api/admin/edition/:id/image-preview/:image', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Edition.findById(req.params.id)
            .populate(['image','images'])
            .then(model => {
                model.image = req.params.image;
                model.save();
                model.populate(['image','images']).execPopulate((e,m)=>{
                    res.send(m)
                })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


};
