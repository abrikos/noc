import Mongoose from "server/db/Mongoose";
import axios from "axios";

const logger = require('logat');
const passportLib = require('server/lib/passport');
const fetchVideoInfo = require('youtube-info');
const youtubeChannes = ['UC-ACL2rOnpLvtNYw9HZJQKQ', 'UCmavIHBeAVh6lbVWkMljf3Q'];
const urlVideos = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE}&order=date&part=snippet&maxResults=20&playlistId=`

async function playlistParse(id) {
    //await Mongoose.Video.deleteMany()
    const url = `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.YOUTUBE}&channelId=${id}&part=id`

    const res = await axios(url)
    for (const pl of res.data.items) {
        const res2 = await axios(urlVideos + pl.id)
        for (const u of res2.data.items.reverse()) {
            const video = u.snippet
            const uid = video.resourceId.videoId;
            const found = await Mongoose.video.findOne({uid})
            if (found) continue;
            await Mongoose.video.create({uid, type: 'youtube', name: video.title + ' ' + video.description})
        }
    }
}

async function loop() {
    for (const id of youtubeChannes) {
        await playlistParse(id)
    }

}
loop()

module.exports.controller = function (app) {
    const job = new app.locals.CronJob('0 0 * * * *', async function () {
        loop()
    }, null, true, 'America/Los_Angeles');


    app.post('/api/admin/video/create', passportLib.isAdmin, (req, res) => {
        Mongoose.video.create({user: req.session.userId})
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
            .catch(e => res.send(app.locals.sendError(e)))
    });

    app.post('/api/admin/video/:id/delete', passportLib.isAdmin, (req, res) => {
        Mongoose.video.findById(req.params.id)
            .then(r => {
                r.delete();
                res.sendStatus(200);
            })
    });


    app.post('/api/admin/video/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose.video.findById(req.params.id)
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

};
