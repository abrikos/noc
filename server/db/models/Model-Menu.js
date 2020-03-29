const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        label: String,
        path: String,
        items: [Object],
        //parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
    }
);



export default mongoose.model("Menu", modelSchema)


