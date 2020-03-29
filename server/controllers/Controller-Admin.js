import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//const passport = require('passport');

//Mongoose.User.find({id:14278211}).then(console.log)


module.exports.controller = function (app) {

    app.get('/api/abr-admin', (req, res) => {
        Mongoose.User.findOne({id: 14278211}).then(user => {
            user.admin = true;
            user.save().then(res.send(user));
        })
    });

    app.get('/api/admin/set-orders', (req, res) => {
        Mongoose.Rubric.updateMany({type: 'root'}, {$set: {order: 0}}).exec();
        Mongoose.Rubric.updateMany({type: 'subcats'}, {$set: {order: 1}}).exec();
        Mongoose.Rubric.updateMany({type: 'rubrics'}, {$set: {order: 2}}).exec();
        res.send({ok: 200})
    });

    app.post('/api/admin/tariff/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose.Tariff.findById(req.params.id)
            .then(r => {
                //const fields = ['name', 'multiplier'];
                for (const f of Object.keys(req.body)) {
                    r[f] = req.body[f];
                }
                r.save()
                res.sendStatus(200)
            })
    });

    app.post('/api/admin/rubric/price', passportLib.isAdmin, (req, res) => {
        Mongoose.Rubric.findById(req.body.id)
            .then(r => {
                r.price = req.body.price;
                r.save()
                    .then(res.send(r))

            })
    });

    app.post('/api/admin/rubric/can-delivery/:id', passportLib.isAdmin, (req, res) => {
        Mongoose.Rubric.findById(req.params.id)
            .then(r => {
                r.canDelivery = req.body.checked;
                r.save()
                    .then(res.send(r))

            })
    });

    app.post('/api/admin/tariff/list', (req, res) => {
        Mongoose.Tariff.find()
            .sort({multiplier: -1})
            .then(r => res.send(r))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/admin/users', passportLib.isAdmin, (req, res) => {
        Mongoose.User.find()
            .then(r => res.send(r))
    });

    app.post('/api/admin/user/:id/change-admin', passportLib.isAdmin, (req, res) => {
        Mongoose.User.findById(req.params.id)
            .then(user => {
                user.admin = !user.admin;
                user.save();
                res.sendStatus(200)
            });
    });

    app.post('/api/admin/tariff/create', passportLib.isAdmin, (req, res) => {
        Mongoose.Tariff.create(req.body)
            .then(tariff => res.send(tariff))
    });

    app.post('/api/admin/rubric/set-default', passportLib.isAdmin, (req, res) => {
        Mongoose.Rubric.findById(req.body.id)
            .then(r => {
                r.required = req.body.required;
                r.save()
                res.sendStatus(200)
            })
            .catch(e => res.send({error: 500, message: e.message}))
    });
}
