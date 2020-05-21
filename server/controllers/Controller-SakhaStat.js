import Mongoose from "server/db/Mongoose";
import axios from "axios";
import moment from "moment";
import {parse} from "node-html-parser";
const fs = require('fs')

module.exports.controller = function (app) {

    async function getData() {
        const res = await axios('https://sakha.gks.ru/')
        const html = parse(res.data);
        const container = html.querySelector('.indicators__main')
        const rows = container.querySelectorAll('.indicators__cols')
        const ret = []
        for(const row of rows){
            const cols = row.querySelectorAll('.indicators__col')
            const r = [];
            for(const col of cols){
                const data = col.querySelector('.indicators__data')
                r.push(data.rawText.trim())
            }
            ret.push(r)
        }
        console.log(ret)
        fs.writeFileSync('build/skaha-stat.json', JSON.stringify(ret),'utf8')
    }

    getData()

    const job = new app.locals.CronJob('0 0 * * * *', async function () {
        getData()
    }, null, true, 'America/Los_Angeles');

}
