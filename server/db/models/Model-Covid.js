import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        new: Number,
        recovery: Number,
        death: Number,
        tests: Number,
        isRussia: Boolean,
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    }
);

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('DD-MM-YYYY HH:mm')
    });


export default mongoose.model("Covid", modelSchema)


