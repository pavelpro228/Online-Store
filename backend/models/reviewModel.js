const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userName: String,
    email: String,
    text: String
}, {versionKey: false})

const reviewModel = mongoose.model('reviews', reviewSchema)
module.exports = reviewModel