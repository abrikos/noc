//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        fname: {type: String, label: 'Фамилия', required: true, default: 'Фам'},
        mname: {type: String, label: 'Имя', required: true, default: 'Им'},
        lname: {type: String, label: 'Отчество'},
        status: {type: String, label: 'Должность', default: ''},
        rank: {type: String, label: 'Звание', default: ''},
        phone: {type: String, label: 'Телефон', default: ''},
        email: {type: String, label: 'Эл.почта', default: ''},
        education: {type: String, label: 'Образование', control:'markdown'},
        awards: {type: String, label: 'Награды', control:'markdown'},
        publications: {type: String, label: 'Публикации', control: 'markdown'},
        interest: {type: String, label: 'Научные интересы', control:'markdown'},
        presidiumStatusId: {type: Number, label: 'Статус президиума', select: [{label: "Президент", value: 1}, {label: "и.о. Президента", value: 2}, {label: "Вице-президент", value: 3}, {label: "Главный ученый секретарь", value: 4}, {label: "Советник", value: 5}]},
        //supervisorStatus: {type: String, label: 'Статус руководства', default: ''},
        //supervisorOrder: {type: Number, label: 'Порядок в руководстве'},
        description: {type: String, label: 'Описание', default: '', control: 'markdown'},
        voice: {type: Number, label: 'Голос в ОУС', select: [{label: "С правом решающего голоса", value: 1}, {label: "С правом совещательного голоса", value: 2}]},
        member: {type: Number, label: 'Членство в АН', select: [{label: "Действительные члены АН РС(Я)", value: 0}, {label: "Почетные члены АН РС(Я)", value: 1}, {label: "Иностранные члены АН РС(Я)", value: 2}]},

        memberStatus: {type: String, label: 'Звание 2'},
        isApparat: {type: Boolean, label: 'В аппарате'},
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],

    },
    {
        //timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['image', 'divisions', 'councils', 'images', 'councilsChief', 'divisionsChief'];
modelSchema.formOptions = {
    listOrder: {fio: 1},
    listFields: ['fioShort'],
    virtualFields: ['divisions', 'councils', 'councilsChief', 'divisionsChief'],
    searchFields: ['fname']
}
modelSchema.virtual('photo')
    .get(function () {
        return this.image ? this.image.path : '/noImage.png'
    });

modelSchema.virtual('division')
    .get(function () {
        let divisions = [];
        if(this.divisionsChief) divisions = divisions.concat(this.divisionsChief)
        if(this.divisions)  divisions = divisions.concat(this.divisions)
        return [...new Set(divisions.map(d=>d.name))].join(', ')
    });


modelSchema.virtual('presidiumStatus')
    .get(function () {
        const option = modelSchema.paths.presidiumStatusId.options.select.find(o=>o.value === this.presidiumStatusId)
        return option && option.label
    });

modelSchema.virtual('fioShort')
    .get(function () {
        return this.lname ? `${this.fname} ${this.mname[0]}. ${this.lname[0]}.` : `${this.mname} ${this.fname[0]}.`
    });

modelSchema.virtual('fio')
    .get(function () {
        return this.lname ? `${this.fname} ${this.mname} ${this.lname}` : `${this.mname} ${this.fname}`
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/person/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        return `/person/` + this.id + '/' + transliterate(this.fio).replace(/[^a-zA-Z0-9]/g, '-')
    });

modelSchema.virtual('divisions', {
    ref: 'Division',
    label: 'Подразделения',
    property: 'name',
    readOnly: true,
    localField: '_id',
    foreignField: 'persons',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('divisionsChief', {
    ref: 'Division',
    label: 'Шеф Подразделений',
    property: 'name',
    readOnly: true,
    localField: '_id',
    foreignField: 'chief',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('councilsChief', {
    ref: 'Council',
    label: 'Председатель ОУС',
    property: 'name',
    localField: '_id',
    foreignField: 'chief',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('councils', {
    ref: 'Council',
    label: 'ОУС',
    property: 'name',
    localField: '_id',
    foreignField: 'persons',
    justOne: false // set true for one-to-one relationship
});

export default mongoose.model("Person", modelSchema)


