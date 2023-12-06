// import schema 
const { typeDefs } = require('./schema'); 
const Product = require('../models/product'); // Adjust the path accordingly
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    
    createUser: async (parent, args) => {
      const argsToHash = args;
      
      await bcrypt.hash(args.input.password, saltRounds, (err, hash) =>{
        if(err){
          console.error('Error hashing password: ', err);
        } else{
          argsToHash.input.password = hash;
        }
      });

      try{
        const newUser = new User(args.input);
        const savedUser = await newUser.save();
        return savedUser;

      }catch(error){
        console.error('Error creating New User: ', error);
        throw new Error('Failed to create New User')
      }
    }
  
  },
};

module.exports = resolvers;
