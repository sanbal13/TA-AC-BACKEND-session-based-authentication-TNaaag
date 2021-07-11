const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number },
  image: { type: String },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
