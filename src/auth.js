// src/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env


const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
