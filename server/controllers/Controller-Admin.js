import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//const passport = require('passport');

//Mongoose.User.find({id:14278211}).then(console.log)


module.exports.controller = function (app) {

    app.post('/api/admin/division/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose.Division.findById(req.params.id)
            .then(r => {
                for(const f of Object.keys(req.body)){
                    r[f] = req.body[f]
                }
                r.save();
                res.sendStatus(200);
            })
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

};
