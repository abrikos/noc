import Mongoose from "server/db/Mongoose";
import axios from "axios";
import moment from "moment";
import {parse} from "node-html-parser";

module.exports.controller = function (app) {
    async function covidMongo(where){
        const today = moment();
        const from_date = today.add(-1,'day').startOf('week');



        const dataWeeks = await Mongoose.covid
            //.find({isRussia:false})
            .aggregate([
                {$match: {createdAt: {$lt:from_date._d}, ...where}},
                //{$addFields:{createdAt:{$dateFromParts:{year:{$year:"$createdAt"}, month:{$month:"$createdAt"}, day:{$dayOfMonth : "$createdAt" }}}}},

                {
                    $group: {
                        //_id: {$dateFromParts:{year:{$year:"$createdAt"}, month:{$month:"$createdAt"}, day:{$dayOfMonth : "$createdAt" }}},
                        _id: {$week:"$createdAt"},
                        newG:{$max:"$new"},
                        recoveryG:{$max:"$recovery"},
                        deathG:{$max:"$death"},
                        testsG:{$max:"$tests"},
                        dateG:{$max:"$createdAt"},
                    },

                },
                {$project:{_id:0, id:"$dateG", new:"$newG", recovery:"$recoveryG", death:"$deathG", tests:"$testsG", type:"week", doy:{$dayOfYear:"$dateG"}}},
                {$sort:{id:1}}
            ])

        const dataDays = await Mongoose.covid
            //.find({isRussia:false})
            .aggregate([
                {$match: {createdAt: {$gt:from_date._d}, ...where}},
                //{$addFields:{createdAt:{$dateFromParts:{year:{$year:"$createdAt"}, month:{$month:"$createdAt"}, day:{$dayOfMonth : "$createdAt" }}}}},

                {
                    $group: {
                        _id: {$dateFromParts:{year:{$year:"$createdAt"}, month:{$month:"$createdAt"}, day:{$dayOfMonth : "$createdAt" }}},
                        newG:{$max:"$new"},
                        recoveryG:{$max:"$recovery"},
                        deathG:{$max:"$death"},
                        testsG:{$max:"$tests"},
                        dateG:{$max:"$createdAt"},
                    },
                },
                {$project:{_id:0, id:"$_id", new:"$newG", recovery:"$recoveryG", death:"$deathG", tests:"$testsG", type:"day", doy:{$dayOfYear:"$dateG"}}},
                {$sort:{id:1}}
            ])
        const data = dataWeeks.concat(dataDays.filter(d=>!dataWeeks.map(x=>x.doy).includes(d.doy)));
        return data;
    }

    app.post('/api/covid', (req, res) => {
        covidMongo(req.body.where)
            .then(data => {
                res.send(data)
            })
    })

    async function covidSakha() {
        const res = await axios('https://stopcovid19.sakha.gov.ru/')
        const html = parse(res.data);
        const containers = html.querySelectorAll('.vc_row')
        const date = html.querySelectorAll('.vc_row')
        const cells = containers[1].querySelectorAll('h2')
        const str = parseDate(date[2].rawText.trim())
        const ret = {
            new: cells[0].rawText * 1,
            recovery: cells[1].rawText * 1,
            death: cells[2].rawText * 1,
            tests: cells[3].rawText,
            isRussia: false,
            createdAt: str
        }
        return ret;
    }


    function parseDate(date) {
        let datestr = date.replace('По состоянию на ', '').replace(',', '');
        const month = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];
        const arr = datestr.split(' ')
        const m = month.indexOf(arr[1]) + 1;
        if (arr[3]) {
            datestr = `${arr[2]}-${m < 10 ? `0${m}` : m}-${arr[0].length===1?'0'+arr[0]:arr[0]} ${arr[3]}`
        } else {
            datestr = `2020-${m < 10 ? `0${m}` : m}-${arr[0].length===1?'0'+arr[0]:arr[0]} ${arr[2]}`
        }
        try {
            return moment(datestr).format('YYYY-MM-DD HH:mm');
        }catch (e) {
            console.log('zzzzzzzzzzzzz', datestr, e.message)
        }
    }


    async function covidRussia() {
        const res = await axios('https://xn--80aesfpebagmfblc0a.xn--p1ai/')
        const html = parse(res.data);
        const container = html.querySelector('.cv-banner__bottom')
        const dateContainer = html.querySelector('.cv-banner__description')
        const createdAt = parseDate(dateContainer.rawText)
        const cells = container.querySelectorAll('.cv-countdown__item-value')
        const ret = {
            new: cells[1].rawText.replace(' ', '') * 1,
            recovery: cells[3].rawText.replace(' ', '') * 1,
            death: cells[4].rawText.replace(' ', '') * 1,
            tests: cells[0].rawText,
            isRussia: true,
            createdAt
        }
        return ret;
    }

    covidSakha()

    async function covid() {
        const rus = await covidRussia();
        const sak = await covidSakha();
        const last1 = await Mongoose.covid.findOne({createdAt: sak.createdAt, isRussia: false});
        if (!last1) {
            Mongoose.covid.create(sak)
        }
        const last2 = await Mongoose.covid.findOne({createdAt: rus.createdAt, isRussia: true});
        if (!last2) {
            Mongoose.covid.create(rus)
        }
    }

    const job = new app.locals.CronJob('0 0 * * * *', async function () {
        covid()
    }, null, true, 'America/Los_Angeles');

}
