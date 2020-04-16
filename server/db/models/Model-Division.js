//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, required: true, label: 'Название'},
        path: {type: String, label: 'Путь'},
        noMenu: {type: Boolean, label: 'Не показывать в меню'},
        noPhoneBook: {type: Boolean, label: 'Не показывать в тел.книге'},
        chief: {type: mongoose.Schema.Types.ObjectId, ref: 'Person', property:'fio', label:'Руководитель'},
        description: {type: String, label: 'Описание', control:'markdown'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image', label:'Файлы'}],
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.label = 'Подразделение';
modelSchema.listFields = ['name'];
modelSchema.listOrder = {name:1};
modelSchema.virtualFields = [{name:'persons',label:'Сотрудники',property:'fio'}];
modelSchema.statics.population = [{path: 'chief', populate: 'image'},{path: 'persons', populate: 'image'},'images'];

modelSchema.virtual('persons', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'division',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('link')
    .get(function () {
        return `/division/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Division", modelSchema)


