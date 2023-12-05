const mongoose = require('mongoose');
const Product = require('./product')

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
});

const Product = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;
