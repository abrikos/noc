//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: String,
        year: String,
        format: String,
        text: String,
        link: String,
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.virtual('photo')
    .get(function () {
        return this.image ? this.image.path : '/noImage.png'
    });

export default mongoose.model("Edition", modelSchema)


