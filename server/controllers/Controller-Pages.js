import Mongoose from "server/db/Mongoose";
import axios from "axios";
import moment from "moment";
import {parse} from "node-html-parser";

const fs = require('fs');


module.exports.controller = function (app) {

    app.post('/api/site-map', async (req, res) => {
        const map = [];
        map.push({label: 'Главная', path: '/', menu: true});
        map.push({label: 'Новости', path: '/news', menu: true});
        const divisions = await Mongoose.division.find({path: {$ne: null}});
        map.push({label: 'Структура', items: [{label: 'Руководство', path: '/people/supervisors/all'}, {label: 'Аппарат', path: '/apparatus'}].concat(divisions.filter(d => !d.noMenu).map(d => ({label: d.name, path: d.link}))), menu: true});
        const meetings = await Mongoose.council.find({isJoined: true});
        map.push({label: 'Ученые советы', items: [{label: 'О советах', path: '/council-about'}].concat(meetings.map(d => ({label: d.name, path: d.link}))), menu: true});
        map.push({
            label: 'Члены академии  АН РС(Я)', menu: true, items: Mongoose.person.schema.paths.member.options.select.map(s => ({label: s.label, path: `/people/${s.value}/members`}))
        })
        map.push({
            label: 'Президиум', menu: true, items: [
                {label: 'Ученый совет Президиума АН РС(Я)', path: '/presidium/council'},
                {label: 'Секретариат', path: '/division/5e80f5ba7549ce5472a10e13/secretariat'},
                {label: 'Документы', path: '/documents/presidium'},
            ]
        });
        map.push({
            label: 'Проекты', items: [
                {label: 'История якутии', path: '/project/sakha-history'},
                {label: 'История якутии. Том 1', path: '/project/sakha-history/1'},
                {label: 'История якутии. Том 2', path: '/project/sakha-history/2'},
                {label: 'История якутии. Том 3', path: '/project/sakha-history/3'},
                {label: '------'},
                {label: 'Переработка мусора', path: '/project/recycle'},
            ], menu: true
        })
        map.push({label: 'Издания', path: '/edition', menu: true})
        map.push({
            label: 'Информация', items: [
                {label: 'Выборы', path: '/election', className: 'text-danger'},
                {label: 'Об Академии', path: '/about'},
                {label: 'Веб-ресурсы академии', path: '/web-resources'},
                {label: 'Научные учереждения', path: '/science-org'},
                {label: 'Документы', path: '/documents/all'},
                {label: 'Партнёры', path: '/partners'},
                {label: 'СМИ о нас', path: '/mass-media'},
                {label: 'О Республике', path: '/about-republic'},
                {label: 'Правительство Республики Саха (Якутия)', path: '/gov'},
                {label: '------'},
                {label: 'Контакты', path: '/contacts'},
                {label: 'Телефонный справочник', path: '/phone-book'}
            ], menu: true
        });


        res.send(map)
    });

    app.post('/api/person/voices', (req, res) => {
        const f = [
            Mongoose.person.schema.paths.member.options.select[0],
            ...Mongoose.person.schema.paths.voice.options.select
        ]
        res.send(f)
    })
    app.post('/api/person/members', (req, res) => {
        res.send(Mongoose.person.schema.paths.member.options.select)
    })

    app.post('/api/covid', (req, res) => {
        Mongoose.covid.find(req.body.where)
            .sort({createdAt: 1})
            .then(data => {
                res.send(data)
            })
    })

    //Mongoose.covid.deleteMany().then(console.log)

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
            tests: cells[3].rawText * 1,
            isRussia:false,
            createdAt: str
        }
        return ret;
    }


    function parseDate(date){
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
        if(arr[3]) {
            datestr = `${arr[2]}-${m < 10 ? `0${m}` : m}-${arr[0]} ${arr[3]}`
        }else{
            datestr = `2020-${m < 10 ? `0${m}` : m}-${arr[0]} ${arr[2]}`
        }
        return moment(datestr).format('YYYY-MM-DD HH:mm');
    }

    async function covidRussia() {
        const res = await axios('https://xn--80aesfpebagmfblc0a.xn--p1ai/')
        const html = parse(res.data);
        const container = html.querySelector('.cv-banner__bottom')
        const dateContainer = html.querySelector('.cv-banner__description')
        const createdAt = parseDate(dateContainer.rawText)
        const cells = container.querySelectorAll('.cv-countdown__item-value')
        const ret = {
            new: cells[1].rawText.replace(' ','') * 1,
            recovery: cells[3].rawText.replace(' ','') * 1,
            death: cells[4].rawText.replace(' ','') * 1,
            tests: cells[0].rawText,
            isRussia:true,
            createdAt
        }
        return ret;


    }

    async function covid() {
        const rus = await covidRussia();
        const sak = await covidSakha();
        const last1 = await Mongoose.covid.findOne({createdAt: sak.createdAt, isRussia:false});
        if (!last1) {
            Mongoose.covid.create(sak)
        }
        const last2 = await Mongoose.covid.findOne({createdAt: rus.createdAt, isRussia:true});
        if (!last2) {
            Mongoose.covid.create(rus)
        }
    }

    covid();
    const job = new app.locals.CronJob('0 0 * * * *', async function () {
        covid()
    }, null, true, 'America/Los_Angeles');


}
