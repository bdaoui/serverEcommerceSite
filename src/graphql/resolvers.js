// import schema 
const { typeDefs } = require('./schema'); 
const Product = require('../models/product'); // Adjust the path accordingly


// resolvers.js
const resolvers = {
  Query: {
    currentUser: (parent, args, { user }) => {
      if (user) {
        return `Hello, ${user.username}!`;
      }
      return 'Not authenticated';
    },
    // New resolver for getting a list of products
    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
    },
  },
  Mutation: {
    // Define your mutations here
    createProduct: async (parent, args) => {
      try {
        const newProduct = new Product(args);
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
      }
    },
  },
};

module.exports = resolvers;
