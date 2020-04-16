import Mongoose from "server/db/Mongoose";

const fs = require('fs');

module.exports.controller = function (app) {

    Mongoose.person.find({member:0, voice:0})
        .populate(Mongoose.council.population)
        .then(console.log)

    app.post('/api/site-map', async (req, res) => {
        const map = [];
        map.push({label: 'Главная', path: '/', menu: true});
        map.push({label: 'Новости', path: '/news', menu: true});
        const divisions = await Mongoose.division.find({path: {$ne: null}});
        map.push({label: 'Структура', items: [{label: 'Руководство', path: '/persons/supervisors'}, {label: 'Аппарат', path: '/apparatus'}].concat(divisions.filter(d => !d.noMenu).map(d => ({label: d.name, path: d.link}))), menu: true});
        const meetings = await Mongoose.council.find();
        map.push({label: 'Ученые советы', items: [{label: 'О советах', path: '/council-about'}].concat(meetings.map(d => ({label: d.name, path: d.link}))), menu: true});
        map.push({
            label: 'Члены академии  АН РС(Я)', menu: true, items: [
                {label: 'Действительные члены', path: '/persons/real-members'},
                {label: 'Почетные члены', path: '/persons/honor-members'},
                {label: 'Иностранные члены', path: '/persons/foreign-members'},
            ]
        })
        map.push({
            label: 'Президиум', menu: true, items: [
                {label: 'Руководство', path: '/persons/supervisors'},
                {label: 'Состав', path: '/presidium/council'},
                {label: 'Секретариат', path: '/division/secretariat'},
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

    app.post('/api/council/voices', (req, res) => {

        res.send(Mongoose.person.schema.paths.voice.options.select)
    })

    /*
        app.post('/api/meeting/:path', (req, res) => {

            Mongoose.meeting.findOne({path: req.params.path})
                .populate([{path: 'persons', populate: 'image'}])
                .then(item => {
                    res.send(item)
                })
                .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
        });


        app.post('/api/division/:page', (req, res) => {
            Mongoose.division.findOne({path: '/' + req.params.page})
                .populate([{path: 'chief', populate: 'image'}])
                .then(model => {
                    res.send(model)
                })
                .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
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
    */
}
