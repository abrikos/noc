import moment from "moment";
import transliterate from "transliterate"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: String,
        text: String,
        path: String,
        editable: Boolean,
        published: Boolean,
        views: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['image','images'];

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    });

modelSchema.virtual('imageOne')
    .get(function () {
        const images = this.images.filter(i=>i.isImage)
        return this.image || images[images.length -1];
    });


modelSchema.virtual('link')
    .get(function () {
        return '/news/'+this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g,'-') : '')
    });


export default mongoose.model("Post", modelSchema)


