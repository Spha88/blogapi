const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, minlength: 1, maxlength: 300, required: true },
    body: { type: String, minlength: 1, maxlength: 1000, required: true },
    date: { type: Date, default: Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    published: { type: Boolean, default: true }
})

postSchema.virtual('url')
    .get(function () {
        return '/posts/' + this._id;
    })

postSchema.virtual('dateFormatted')
    .get(function () {
        return moment(this.date).format('a, ddd DD MMMM, YYYY');
    })

module.exports = mongoose.model('Post', postSchema);
