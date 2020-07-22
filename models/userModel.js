const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String, minlength: 1, maxlength: 100, required: true },
    last_name: { type: String, minlength: 1, maxlength: 100, required: true },
    imageUrl: { type: String, minlength: 1, maxlength: 500 },
    bio: { type: String, minlength: 1, maxlength: 2000 },
    username: { type: String, minlength: 1, maxlength: 100, required: true },
    password: { type: String, minlength: 1, maxlength: 100, required: true },
    createdOn: { type: Date, default: Date.now() }
})

userSchema.virtual('fullname')
    .get(function () {
        return this.first_name + ' ' + this.last_name;
    })

module.exports = mongoose.model('User', userSchema);