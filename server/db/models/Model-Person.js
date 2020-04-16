//import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        fio:{type: String, label:'ФИО', required:true, default:'new person'},
        status: {type: String, label:'Звание',  default:''},
        rank: {type: String, label:'Должность',  default:''},
        phone: {type: String, label:'Телефон',  default:''},
        email: {type: String, label:'Эл.почта',  default:''},
        education: {type: String, label:'Образование'},
        awards: {type: String, label:'Награды'},
        publications: {type: String, label:'Публикации', control:'markdown'},
        supervisorStatus: {type: String, label:'Статус руководства',  default:''},
        supervisorOrder: {type: Number, label:'Порядок в руководстве'},
        description: {type: String, label:'Описание',  default:'', control:'markdown'},
        voice: {type: Number, label:'Голос в ОУС'},
        member: Number,
        memberStatus: {type: String, label:'Звание 2'},
        isApparat: {type: Boolean, label:'В аппарате'},
        division: {type: mongoose.Schema.Types.ObjectId, ref: 'Division', property:'name', label:'Подразделение'},
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],

    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['image', 'division', 'images'];
modelSchema.listOrder = {fio:1};
modelSchema.listFields = ['fio'];
modelSchema.formFields = ['fio', 'education', 'awards', 'publications', 'status','rank','phone','email','supervisorStatus', 'supervisorOrder', 'description', 'voice',  'memberStatus', 'isApparat', 'division'];
modelSchema.virtual('photo')
    .get(function () {
        return this.image ? this.image.path : '/noImage.png'
    });


export default mongoose.model("Person", modelSchema)


