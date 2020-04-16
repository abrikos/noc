//import moment from "moment";

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
modelSchema.formFields = ['name','noMenu','noPhoneBook','chief','description'];
modelSchema.statics.population = [{path: 'chief', populate: 'image'},{path: 'persons', populate: 'image'},'images'];

modelSchema.virtual('persons', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'division',
    justOne: false // set true for one-to-one relationship
});

export default mongoose.model("Division", modelSchema)


