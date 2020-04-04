import Mongoose from "server/db/Mongoose";
import axios from "axios";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const logger = require('logat');
const crypto = require('crypto');


passport.use(new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
        Mongoose.User.findOne({username})
            .then(user => {
                if (!user) {
                    return done(null, false, {error: 'username', message: 'Incorrect username.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {error: 'password', message: 'Incorrect password.'});
                }
                if (!user.emailConfirmed) {
                    return done(null, user, {error: 'email-confirm', message: 'Email not confirmed.'});
                }
                //return done(null, null, {error: 'test-endpoint', message: 'TEST WRONG login.'});
                return done(null, user, {});
            })
            .catch(done)
        ;
    }
));

passport.use('custom', new CustomStrategy(async function (req, done) {
    let user;
    switch (req.params.strategy) {
        case 'vk':
            user = await vk(req, done);
            break;
        case 'telegram':
            user = await telegram(req, done);
            break;
        case 'mailru':
            user = await mailru(req, done);
            break;
    }
    if (!user.error) {
        req.session.userId = user.id;
        req.session.admin = user.admin;
        done(null, user)
    } else {
        done(null, false, user)
    }
}));

async function telegram(req, done) {
    const data = req.query;
    if (checkSignature(data)) {
        return await getUser(data.id, 'telegram', data.first_name, data.photo_url)
    } else {
        return {error: 'wrong-data', message: 'Wrong POST data.'};
    }
}

async function vk(req, done) {
    const url = `https://oauth.vk.com/access_token?client_id=${process.env.VK_ID}&client_secret=${process.env.VK_SECRET}&redirect_uri=${process.env.SITE}/api/login/${req.params.strategy}&code=${req.query.code}`;
    const response = await axios(url);
    const data1 = response.data;
    const urlInfo = `https://api.vk.com/method/users.get?user_ids=${data1.user_id}&fields=photo_50,sex&access_token=${data1.access_token}&v=5.103`;
    const result = await axios(urlInfo);
    const data = result.data.response[0];
    return getUser(data.id, req.params.strategy, data.first_name + ' ' + data.last_name, data.photo_50)
}

async function mailru(req, done) {
    const url = `https://oauth.vk.com/access_token?client_id=${process.env.VK_ID}&client_secret=${process.env.VK_SECRET}&redirect_uri=${process.env.SITE}/api/login/${req.params.strategy}&code=${req.query.code}`;
}

async function getUser(externalId, strategy, name, photo) {
    let user = await Mongoose.User.findOne({externalId, strategy})
    if (!user) {
        const admin = externalId == 14278211;
        user = await Mongoose.User.create({externalId, name, photo, strategy, admin})
    }
    return user;
}

function checkSignature({hash, ...data}) {
    const TOKEN = process.env.BOT_TOKEN;
    const secret = crypto.createHash('sha256')
        .update(TOKEN)
        .digest();
    const {returnUrl, ...rest} = data;
    const checkString = Object.keys(rest)
        .sort()
        .map(k => (`${k}=${data[k]}`))
        .join('\n');
    const hmac = crypto.createHmac('sha256', secret)
        .update(checkString)
        .digest('hex');
    return hmac === hash;
}


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = {
    initialize: passport.initialize,
    session: passport.session,
    checkSignature,

    isLogged: function (req, res, next) {

        if (req.session.passport) {
            //console.log('AUTHENTICATED')
            //req.session.userId = req.session.passport.user._id
            return next()
        } else {
            //hconsole.error('DENIED')
            res.sendStatus(401);
        }
    },

    isAdmin: function (req, res, next) {

        if (req.session.passport && req.session.passport.user.admin) {
            //console.log('AUTHENTICATED')
            return next()
        } else {
            //console.error('DENIED', req.session.passport)
            res.sendStatus(403);
        }
    },

    loginLocal: passport.authenticate('local'),
    loginGithub: passport.authenticate('github'),

}
