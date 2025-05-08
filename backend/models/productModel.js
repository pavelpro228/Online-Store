const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  specs: Object,
  firm: String
}, {versionKey: false})

const productModel = mongoose.model('products', productSchema)
module.exports = productModel