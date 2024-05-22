const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  duration: { type: Number, required: true },
  products: { type: String },
  status: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the recipe
  createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Order', orderSchema); 