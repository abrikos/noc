const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: String,
        path: String,
        text: String,
        published: Boolean,
        views: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        //parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
    }
);


export default mongoose.model("Page", modelSchema)


