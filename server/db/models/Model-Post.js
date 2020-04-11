import moment from "moment";


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
        return this.image || this.images[this.images.length -1];
    });

modelSchema.virtual('link')
    .get(function () {
        return '/news/'+this.id
    });


export default mongoose.model("Post", modelSchema)


