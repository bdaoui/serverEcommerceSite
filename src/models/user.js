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
      type: cartItemSchema,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem'
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
