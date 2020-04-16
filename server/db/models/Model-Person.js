//import moment from "moment";

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
        education: {type: String, label: 'Образование'},
        awards: {type: String, label: 'Награды'},
        publications: {type: String, label: 'Публикации', control: 'markdown'},
        interest: {type: String, label: 'Научные интересы'},
        supervisorStatus: {type: String, label: 'Статус руководства', default: ''},
        supervisorOrder: {type: Number, label: 'Порядок в руководстве'},
        description: {type: String, label: 'Описание', default: '', control: 'markdown'},
        voice: {type: Number, label: 'Голос в ОУС', select: ["Действительные члены АН РС(Я)", "С правом решающего голоса", "С правом совещательного голоса"]},
        member: {type: Number, label: 'Членство в АН', select: ["Действительные члены АН РС(Я)", "С правом решающего голоса", "С правом совещательного голоса"]},

        memberStatus: {type: String, label: 'Звание 2'},
        isApparat: {type: Boolean, label: 'В аппарате'},
        //divisions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Division', property: 'name', label: 'Подразделение'}],
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

modelSchema.statics.population = ['image', 'divisions', 'councils', 'images', 'councilsChief'];
modelSchema.formOptions = {
    listOrder: {fio: 1},
    listFields: ['fioShort'],
    virtualFields: ['divisions', 'councils', 'councilsChief'],
    searchFields: ['fname', 'lname', 'mname']
}
modelSchema.virtual('photo')
    .get(function () {
        return this.image ? this.image.path : '/noImage.png'
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
        return`/admin/person/${this.id}/update`
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


