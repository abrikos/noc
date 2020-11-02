import moment from "moment";
import transliterate from "transliterate"
import striptags from "striptags";

const removeMd = require('remove-markdown');
const ogs = require('open-graph-scraper');
const util = require('util')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type: String, label: 'Заголовок'},
        text: {type: String, label: 'Текст', control: 'markdown'},
        imgUrl: {type: String},
        url: {type: String, label: 'Адрес на сайте СМИ'},
        isMarkdown: {type: Boolean, label: 'Markdown', default: true},
        editable: Boolean,
        published: {type: Boolean, label: 'Опубликовано'},
        views: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'file'}],
        file: {type: mongoose.Schema.Types.ObjectId, ref: 'file'},
        preview: {type: mongoose.Schema.Types.ObjectId, ref: 'file'},

    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['image', 'images', 'preview'];

modelSchema.formOptions = {
    label: 'Новости',
    listOrder: {createdAt: -1},
    listFields: ['header', 'date'],
    searchFields: ['header'],
}

modelSchema.statics.fromUrl = async function({url}, user){
    const ogsP = util.promisify(ogs)
    const r = await ogsP({url})
    return await this.create({user, imgUrl: r.ogImage.url, header: r.ogTitle, text: r.ogDescription, published: true, url})
}

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })
    .set(function (val) {
        this.createdAt = moment(val).format('YYYY-MM-DD HH:mm:ss');

    });

modelSchema.virtual('previewPath')
    .get(function () {
        const image = this.image || this.preview;
        return image ? image.path : this.imgUrl || '/noImage.png'
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/post/${this.id}/update`
    });

modelSchema.virtual('shareData')
    .get(function () {
        return {
            header: `${process.env.SITE_NAME} - ${removeMd(this.header)}`,
            text: striptags(removeMd(this.text)),
            image: `${process.env.SITE}${this.image ? this.image.path : '/logo.svg'}`,
            url: `${process.env.SITE}${this.link}`
        }
    });

modelSchema.virtual('link')
    .get(function () {
        if (this.isMassMedia) return this.url || '/';
        return `/post/` + this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Post", modelSchema)


