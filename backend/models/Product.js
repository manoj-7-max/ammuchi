const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tamilName: { type: String },
  description: { type: String },
  tamilDescription: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  ingredients: [{ type: String }],
  benefits: [{ type: String }],
  image: { type: String },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
