const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tamilName: { type: String },
  description: { type: String },
  tamilDescription: { type: String },
  price: { type: Number, required: true },
  weight: { type: String, default: '500g' },
  category: { type: String, required: true },
  ingredients: [{ type: String }],
  benefits: [{ type: String }],
  image: { type: String },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
