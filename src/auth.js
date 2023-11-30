// src/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key'; // Use a default value if not provided

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
