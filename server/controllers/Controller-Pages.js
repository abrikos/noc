import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
const passport = require('passport');
const logger = require('logat');
let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs')

module.exports.controller = function (app) {

    //Mongoose.Person.find({fio:/Буди/}).then(console.log)
    app.post('/api/division/list', (req, res) => {
        Mongoose.Division.find()
            .populate('persons')
            .then(items => {
                res.send(items)
            })
    });

    app.post('/api/person/list', (req, res) => {
        Mongoose.Person.find()
            .sort({fio: 1})
            .then(items => {
                res.send(items)
            })
    });


    app.post('/api/division/:page', (req, res) => {
        Mongoose.Division.findOne({path: '/' + req.params.page})
            .populate([{path: 'chief', populate: 'image'}])
            .then(model => {
                res.send(model)
            })
    });

    app.post('/api/static/:page', async (req, res) => {
        const file = 'client/static/' + req.params.page + '.html';
        try {
            const html = fs.readFileSync(file, 'utf8');
            res.send({html})
        } catch (e) {
            res.sendStatus(404)
        }
    });
}
