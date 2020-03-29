//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        idOld: {type: Number},
        price: {type: Number, default:0},
        name: String,
        type: String,
        tag: String,
        order: Number,
        parentOld: {type: Number, index: true},
        parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Rubric'},
        required: Boolean,
        canDelivery: Boolean,
        //values: {type: [mongoose.Schema.Types.ObjectId], ref: 'Rubric'},
        count: {type: Number},
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.virtual('children', {
    ref: 'Rubric',
    localField: '_id',
    foreignField: 'parent',
    justOne: false // set true for one-to-one relationship
});

export default mongoose.model("Rubric", modelSchema)


