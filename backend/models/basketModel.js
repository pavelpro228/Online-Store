const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({
  email: String,
  product: {
    name: String,
    price: Number,
    image: String,
  },
  count: Number
}, {versionKey: false})

const basketModel = mongoose.model('baskets', basketSchema)
module.exports = basketModel
