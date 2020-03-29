//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        fio: String,
        status: String,
        rank: String,
        phone: String,
        email: String,
        division: {type: mongoose.Schema.Types.ObjectId, ref: 'Division'},
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},

    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

export default mongoose.model("Person", modelSchema)


