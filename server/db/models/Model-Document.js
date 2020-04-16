//import moment from "moment";

import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type:String, label:'Название', required:true, default:'Новый документ'},
        link: {type:String, label:'Ссылка', required:true, default:'ссылка'},
        isPresidium: {type:Boolean, label:'Президиум'},
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

modelSchema.statics.population = ['image', 'images'];
modelSchema.formOptions = {
    label: 'Документ',
    listFields: ['header','date'],
    searchFields: ['header'],
}



modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD')
    });

modelSchema.virtual('photo')
    .get(function () {
        return this.image ? this.image.path : '/noImage.png'
    });

export default mongoose.model("Document", modelSchema)


