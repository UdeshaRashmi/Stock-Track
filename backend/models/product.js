const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  description: { type: String, maxlength: 500 },
  category: { type: String, default: 'electronics' },
  sku: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
