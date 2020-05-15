//import moment from "moment";

import transliterate from "transliterate";
import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        lname: {type: String, label: 'Фамилия', required: true, default: 'Фам'},
        fname: {type: String, label: 'Имя', required: true, default: 'Им'},
        mname: {type: String, label: 'Отчество'},
        age: {type: String, label: 'Возраст', default: ''},
        country: {type: String, label: 'Страна', default: ''},
        city: {type: String, label: 'Город', default: ''},
        address: {type: String, label: 'Адрес', default: ''},
        organisation: {type: String, label: 'Организация', default: ''},
        rank: {type: String, label: 'Ученая степень, звание, должность', default: ''},
        phone: {type: String, label: 'Телефон', default: ''},
        email: {type: String, label: 'Эл.почта', default: ''},
        title: {type: String, label: 'Название доклада', control:'markdown'},
        direction: {type: String, label: 'Предполагаемое направление научной программы конференции', control:'markdown'},
        genderId: {type: Number, label: 'Пол', select: [{label: "М", value: 1}, {label: "Ж", value: 2}]},
        participationId: {type: Number, label: 'Форма участия', select: [ { label: 'Заочное участие (только публикация тезисов)', value: 1 },
                { label: 'Очное участие с докладом', value: 2 },
                { label: 'Очное участие со стендовым докладом', value: 3 }
            ]},
        },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = [];
modelSchema.formOptions = {
    label:'Участники конференции',
    listOrder: {fio: 1},
    listFields: ['fioShort'],
    searchFields: ['fname']
}

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/conference/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        return `/conference/` + this.id + '/' + (this.fname ? transliterate(this.fioShort).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })

modelSchema.virtual('gender')
    .get(function () {
        const option = modelSchema.paths.genderId.options.select.find(o=>o.value === this.genderId)
        return option && option.label
    });

modelSchema.virtual('participation')
    .get(function () {
        const option = modelSchema.paths.participationId.options.select.find(o=>o.value === this.participationId)
        return option && option.label
    });


modelSchema.virtual('fioShort')
    .get(function () {
        return this.fname ? `${this.lname} ${this.fname[0]}. ${this.mname[0]}.` : `${this.mname} ${this.lname[0]}.`
    });

modelSchema.virtual('fio')
    .get(function () {
        return this.fname ? `${this.lname} ${this.fname} ${this.mname}` : `${this.mname} ${this.lname}`
    });


export default mongoose.model("Conference", modelSchema)


