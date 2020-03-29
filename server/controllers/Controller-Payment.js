import Mongoose from "server/db/Mongoose";
import moment from "moment";
import md5 from "md5";

const YandexCheckout = require('yandex-checkout')(process.env.shop_id, process.env.secret_key);

const CronJob = require('cron').CronJob;
//Mongoose.Post.updateMany({},{$set:{payment:null}}).exec()


module.exports.controller = function (app) {

    app.get('/api/payment/done', async (req, res) => {
        console.log(req.body);
        res.send({ok: 200})
    });

    app.post('/api/payment/done', async (req, res) => {
        if(!req.body.object) return res.send({ok:200});
        if(!req.body.object.metadata) return res.send({ok:200});
        if(!req.body.object.metadata.id) return res.send({ok:200});
        if(req.body.object.metadata.hash !== md5(process.env.seed + req.body.object.metadata.id)) return res.send({ok:200});
        Mongoose.Payment.findById(req.body.object.metadata.id)
            .populate('post')
            .then(payment => {
                payment.post.payment = payment;
                payment.post.save();
                payment.complete = true;
                payment.save();
                app.locals.socketSend('payment-complete');
                res.send({ok: 200})
            })
            .catch(e => res.send({ok:200}))
    });

    app.post('/api/payment/create/post/:post/tariff/:tariff/method/:method', async (req, res) => {
        try {
            const post = await Mongoose.Post.findById(req.params.post).populate('types');
            const rub = post.types.find(p => p.price);
            const tariff = await Mongoose.Tariff.findById(req.params.tariff);
            const payment = await Mongoose.Payment.create({post, tariff, price: rub.price * tariff.multiplier});
            YandexCheckout.createPayment({
                'amount': {
                    'value': payment.price,
                    'currency': 'RUB'
                },
                'payment_method_data': {
                    type: req.params.method,

                },
                'confirmation': {
                    'type': 'redirect',
                    'return_url': 'https://www.beru14.ru/post/' + post.id
                },
                capture:true,
                metadata: {id: payment.id, hash: md5(process.env.seed + payment.id)}
            }, payment.id)
                .then(result => res.send(result))
                .catch(e => {
                    console.log(e)
                    res.send({error: e.name, message: e.message})
                })

        } catch (e) {
            res.send(app.locals.sendError({error: 500, message: e.message}))
        }
    });

    const job = new CronJob('*/10 * * * * *', async function () {
        const posts = await Mongoose.Post.find({payment: {$ne: null}})
            .populate(Mongoose.Post.population)
        for (const post of posts) {
            if (moment(post.payment.createdAt).add(post.payment.tariff.days, 'days').valueOf() < moment().valueOf()) {
                post.payment = null;
                await post.save()
                app.locals.socketSend('payment-expired');
            }
            //

        }

    }, null, true, 'America/Los_Angeles');

};

