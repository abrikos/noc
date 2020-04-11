import Mongoose from "server/db/Mongoose";

const logger = require('logat');
const passportLib = require('server/lib/passport');
const fetchVideoInfo = require('youtube-info');
//const passport = require('passport');

//Mongoose.Meeting.find({}).then(console.log)


module.exports.controller = function (app) {


    app.post('/api/admin/video/create', passportLib.isAdmin, (req, res) => {
        Mongoose.Video.create({user: req.session.userId})
            .then(async r => {
                const found = req.body.link.match(/v=(.*)/);
                const types = []
                types.push({type: 'youtube', info: await fetchVideoInfo(found[1])})
                const video = types.find(t => !!t.info);
                if (!video) return res.send({error: 500, message: 'Wrong video'})
                r.uid = found[1];
                r.type = video.type;
                r.name = video.info.title;
                r.text = video.info.description
                await r.save()
                res.send(r);
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/admin/video/:id/delete', passportLib.isAdmin, (req, res) => {
        Mongoose.Video.findById(req.params.id)
            .then(r => {
                r.delete();
                res.sendStatus(200);
            })
    });


    app.post('/api/admin/video/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose.Video.findById(req.params.id)
            .then(async r => {
                if (req.body.link !== r.link) {
                    const found = req.body.link.match(/v=(.*)/);
                    if (!found) return res.send({error: 500, message: 'Wrong youtube link'})
                    const info = await fetchVideoInfo(found[1]);
                    r.name = info.title;
                    r.text = info.description
                } else {
                    for (const f of Object.keys(req.body)) {
                        r[f] = req.body[f]
                    }
                }
                r.save();
                res.sendStatus(200);
            })
    });

    app.post('/api/video/list', (req, res) => {
        Mongoose.Video.find(req.body.where)
            .sort({createdAt: -1})
            .limit(parseInt(req.body.limit) || 10)
            .skip(parseInt(req.body.skip))
            .then(list => {
                Mongoose.Video.countDocuments(req.body.where)
                    .then(count => {
                        res.send({count, list})
                    })

            })
    });

    app.post('/api/video/:id', (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose.Video.findById(req.params.id)
            .then(item => {
                res.send(item)
            });
    });

};
