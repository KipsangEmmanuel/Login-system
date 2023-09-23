const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
})

const UserSchema = mongoose.model('user', userSchema);

module.exports = UserSchema;