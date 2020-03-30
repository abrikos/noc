//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: String,
        path: String,
        persons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
        description: String,
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


export default mongoose.model("Presidium", modelSchema)


