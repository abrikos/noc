//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, label: 'Название'},
        chief: {type: mongoose.Schema.Types.ObjectId, ref: 'Person', label: 'Председатель', property: 'fioShort'},
        persons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person', label: 'Персоны', property: 'fioShort'}],
        description: {type: String, label: 'Описание'},
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });
modelSchema.statics.population = [{path: 'persons', populate: 'image'},{path:'chief', populate:'image'}];
modelSchema.formOptions = {
    label: 'Ученый совет',
    listOrder: {name: 1},
    listFields: ['name'],
    searchFields: ['name'],
    hasMany: ['persons']
}

modelSchema.virtual('adminLink')
    .get(function () {
        return`/admin/council/${this.id}/update`
    });


modelSchema.virtual('link')
    .get(function () {
        return `/council/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Council", modelSchema)


