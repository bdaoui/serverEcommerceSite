const mongoose = require('mongoose');
const Product = require('./product')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      // Define the structure of items in the cart array
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
