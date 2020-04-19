//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, required: true, label: 'Название'},
        address: {type: String, label: 'Адрес'},
        phone: {type: String, label: 'Телефон'},
        email: {type: String, label: 'Email'},
        //path: {type: String, label: 'Путь'},
        noMenu: {type: Boolean, label: 'Не показывать в меню'},
        noPhoneBook: {type: Boolean, label: 'Не показывать в тел.книге'},
        chief: {type: mongoose.Schema.Types.ObjectId, ref: 'Person', property:'fioShort', sort:{fname:1}, label:'Руководитель'},
        description: {type: String, label: 'Описание', control:'markdown'},
        persons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person', label:'Сотрудники', property:'fioShort', sort:{fname:1}}],
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image', label:'Файлы'}],
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


modelSchema.statics.population = [{path: 'chief', populate: 'image'},{path: 'persons', populate: ['image','divisions'], options:{sort:{fname:1}}},'images'];

modelSchema.formOptions = {
    label: 'Подразделение',
    listOrder: {name: 1},
    listFields: ['name'],
    searchFields: ['name'],
    hasMany: ['persons']
}

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/division/${this.id}/update`
    });


modelSchema.virtual('link')
    .get(function () {
        return `/division/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Division", modelSchema)


