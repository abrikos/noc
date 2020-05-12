import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        uid: String,
        type: String,
        name: {type:String, label:"Название"},
        text: {type:String, label:"Описание"},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.formOptions = {
    label: 'Видео',
    listOrder: {createdAt: -1},
    listFields: ['name', 'date'],
    searchFields: ['name'],
}


modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    });

modelSchema.virtual('link')
    .get(function () {
        let link;
        if(this.type==='youtube') link = `https://www.youtube.com/watch?v=${this.uid}`
        return link;
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/video/${this.id}/update`
    });


export default mongoose.model("Video", modelSchema)


