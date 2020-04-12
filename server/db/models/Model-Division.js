//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: String,
        path: String,
        noMenu: Boolean,
        chief: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
        description: String,
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.virtual('persons', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'division',
    justOne: false // set true for one-to-one relationship
});

export default mongoose.model("Division", modelSchema)


