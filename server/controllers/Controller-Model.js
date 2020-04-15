import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//const passport = require('passport');

//Mongoose.Meeting.find({}).then(console.log)


module.exports.controller = function (app) {

    function getSchema(name){
        const schema = Mongoose[name].schema;
        return {
            label: schema.label,
            listFields: schema.listFields,
            formFields: schema.formFields,
            fields: Object.keys(schema.paths).filter(p => schema.formFields.includes(p)).map(key => {
                const p = schema.paths[key];
                //const ref = p.options.ref || p.options.type;
                return {
                    name: p.path,
                    type: p.instance,
                    options:p.options
                }
            })
        }
    }

    app.post('/api/:model/schema', (req, res) => {
        res.send(getSchema(req.params.model))

    });

    app.post('/api/:model/:id/view', (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .populate(Mongoose[req.params.model].population)
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/:model/:id/update', (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .populate(Mongoose[req.params.model].population)
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/:model/list', (req, res) => {
        Mongoose[req.params.model].find(req.body.where)
            .sort(req.body.order || {createdAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .populate(Mongoose[req.params.model].population)
            .then(list => {
                Mongoose[req.params.model].countDocuments(req.body.where)
                    .then(count => {
                        res.send({count, list})
                    })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/admin/:model/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .then(r => {
                for (const f of Object.keys(req.body)) {
                    r[f] = req.body[f]
                }
                r.save();
                res.sendStatus(200);
            })
    });
    app.post('/api/admin/:model/create', passportLib.isAdmin, (req, res) => {
        Mongoose[req.params.model].create(req.body)
            .then(r => {
                res.send(r);
            })
    });
    app.post('/api/admin/:model/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose[req.params.model].findById(req.params.id)

            .then(model => {
                model.images = model.images.concat(req.body.images);

                model.save()
                model.populate(['image', 'images']).execPopulate((e, m) => {
                    res.send(m)
                })


            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });
    app.post('/api/admin/:model/:id/image-preview/:image', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose[req.params.model].findById(req.params.id)
            .populate(['image', 'images'])
            .then(model => {
                model.image = req.params.image;
                model.save();
                model.populate(['image', 'images']).execPopulate((e, m) => {
                    res.send(m)
                })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


};
