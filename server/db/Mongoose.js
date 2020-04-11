import User from "server/db/models/Model-User";
import Rubric from "server/db/models/Model-Rubric";
import Image from "server/db/models/Model-Image";
import Post from "server/db/models/Model-Post";
import Division from "server/db/models/Model-Division";
import Person from "server/db/models/Model-Person";
import Meeting from "server/db/models/Model-Meeting";
import Edition from "server/db/models/Model-Edition";
import Video from "server/db/models/Model-Vieo";
import Static from "server/db/models/Model-Static";


const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
// подключение
console.log('Mongoose connect...');
mongoose.connect("mongodb://localhost:27017/academy", {useNewUrlParser: true, useUnifiedTopology: true});
console.log('Mongoose connected!');
//mongoose.connect("mongodb://108.160.143.119:27017/minterEarth", {useNewUrlParser: true});

const Mongoose = {
    close: function (cb) {
        mongoose.disconnect(cb)
    },
    Types: mongoose.Types,
    connection: mongoose.connection,
    checkOwnPassport: function (model, passport) {
        if (!passport) return false;
        return JSON.stringify(passport.user._id) === JSON.stringify(model.user.id);
    },
    checkOwnCookie: function (model, cookie) {
        if (!cookie) return false;
        if (!cookie.length) return false;
        return cookie.indexOf(model.cookieId) !== -1;
    },
    isValidId: function (id) {
        return mongoose.Types.ObjectId.isValid(id)
    },
    User, Rubric, Image, Post, Division, Person, Meeting, Edition, Video, Static

};
export default Mongoose;
