import Mongoose from "server/db/Mongoose";

const fs = require('fs');

module.exports.controller = function (app) {

    //Mongoose.Person.find({member:0}).populate('division').then(console.log)


    app.post('/api/division/list', (req, res) => {
        Mongoose.Division.find()
            .populate([{path: 'persons', populate: 'image'}])
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/edition/list', (req, res) => {
        Mongoose.Edition.find()
            .populate('image')
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/site-map', async (req, res) => {
        const map = [];
        map.push({label: 'Главная', path: '/', menu: true});
        map.push({label: 'Новости', path: '/news', menu: true});
        const divisions = await Mongoose.Division.find({path: {$ne: null}});
        map.push({label: 'Структура', items: divisions.filter(d=>!d.noMenu).map(d => ({label: d.name, path: '/division' + d.path})), menu: true});
        const meetings = await Mongoose.Meeting.find({path: {$ne: null}});
        map.push({label: 'Ученые советы',  items: [{label: 'О советах', path: '/meeting-about'}].concat(meetings.map(d => ({label: d.name, path: '/meeting/' + d.path}))), menu: true});
        map.push({label: 'Члены академии  АН РС(Я)',  menu: true, items:[
                {label: 'Действительные члены', path: '/persons/real-members'},
                {label: 'Почетные члены', path: '/persons/honor-members'},
                {label: 'Иностранные члены', path: '/persons/foreign-members'},
            ]})
        map.push({label: 'Президиум',  menu: true, items:[
                {label: 'Аппарат', path: '/apparatus'},
                {label: 'Секретариат', path: '/division/secretariat'},
                {label: 'Руководство', path: '/persons/supervisors'},
            ]});
        map.push({label: 'Проекты', items:[
            {label:'История якутии', path:'/project/sakha-history'},
            {label:'История якутии. Том 1', path:'/project/sakha-history/1'},
            {label:'История якутии. Том 2', path:'/project/sakha-history/2'},
            {label:'История якутии. Том 3', path:'/project/sakha-history/3'},
            {label:'------'},
            {label:'Переработка мусора', path:'/project/recycle'},
            ], menu:true})
        map.push({label: 'Издания', path: '/edition', menu:true})
        map.push({label: 'Информация', items:[
                {label: 'О Республике', path: '/about-republic'},
                {label: 'Об Академии', path: '/about'},
                {label: 'Научные учереждения', path: '/science-gov'},
                {label: 'Партнёры', path: '/partners'},
                {label: 'Правительство Республики Саха (Якутия)', path: '/gov'},
                {label: 'СМИ о нас', path: '/mass-media'},
                {label: 'Контакты', path: '/contacts'}
            ], menu: true});




        res.send(map)
    });

    app.post('/api/person/list', (req, res) => {
        Mongoose.Person.find(req.body.where ? req.body.where : req.body)
            .sort(req.body.order || {fio: 1})
            .populate(['image','division'])
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/meeting/list', (req, res) => {
        Mongoose.Meeting.find()
            .populate([{path: 'persons', populate: 'image'}])
            .then(items => {
                res.send(items)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/meeting/:path', (req, res) => {

        Mongoose.Meeting.findOne({path: req.params.path})
            .populate([{path: 'persons', populate: 'image'}])
            .then(item => {
                res.send(item)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/division/:page', (req, res) => {
        Mongoose.Division.findOne({path: '/' + req.params.page})
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
}
