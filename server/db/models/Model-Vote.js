//import moment from "moment";
import transliterate from "transliterate";
import moment from "moment";

const modelLabel = 'Повестка';
const path = 'vote'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, label: 'Название'},
        description: {type: String, label: 'Описание', control: 'markdown'},
        days: {type: Number, label: 'Дни пока действительно', default: 1},
        published: Boolean,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


modelSchema.statics.population = [
    'photo', 'files', 'questions', 'bulletins'
];

modelSchema.statics.populationAdmin = [
    'photo', 'files', 'questions', 'bulletins'
];

modelSchema.formOptions = {
    label: modelLabel,
    listOrder: {name: 1},
    listFields: ['name'],
    searchFields: ['name'],
}

modelSchema.virtual('questions', {
    ref: 'question',
    label: 'голосование',
    property: 'name',
    readOnly: true,
    localField: '_id',
    foreignField: 'vote',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('bulletins', {
    ref: 'bulletin',
    localField: '_id',
    foreignField: 'vote',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('voted')
    .get(function () {
        return this.bulletins.filter(b=>b.voted).length
    });

modelSchema.virtual('complete')
    .get(function () {
        return this.voted === this.bulletins.length
    });



modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('DD.MM.YYYY')
    })
    .set(function (val) {
        this.createdAt = moment(val).format('YYYY-MM-DD HH:mm:ss');

    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/${path}/${this.id}/update`
    });

modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });

modelSchema.virtual('link')
    .get(function () {
        return `/${path}/` + this.id + '/-' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });

modelSchema.virtual('shareLink')
    .get(function () {
        return `/api/${path}/share/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model(path, modelSchema)


