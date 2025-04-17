const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    confirmPassword: String
}, {versionKey: false})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel