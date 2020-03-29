import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        type: String
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.virtual('path')
    .get(function () {
        return `/uploads/${this.id}.${this.type || 'jpg'}`;
    });

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    });


export default mongoose.model("Image", modelSchema)


