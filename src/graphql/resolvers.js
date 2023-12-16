// import schema 
const { typeDefs } = require('./schema'); 
const Product = require('../models/product'); // Adjust the path accordingly
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
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

    product: async (_, args ) =>{
        try {
          if(!args.id){
            console.error("Id Needed")
            throw new Error("No ID provided")
            return 
          }

          const product = await Product.findById(args.id);
          return product;

        }
        catch(error){
          console.error("Error fetching Product: ", error);
          throw new Error ("Failed Retreiving Product");
        }
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
    
    // Create New Product
    createProduct: async (parent, args) => {
      try {
        const newProduct = new Product(args.input);
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
      }
    },
    
    // Create New User, Wait for Hash Password
    createUser: async (parent, args) => {
      console.log('Creation of New User...')
      const {username, email, password} = args.input;
      
      const hashedPassword = await new Promise( (resolve, reject) =>{
        bcrypt.hash(password, saltRounds, (err, hash) =>{
          if(err){
            console.error('Error hashing password: ', err);
            reject(err);
          } else{
            args.input.password = hash;
            resolve(hash);
          }
        });
      });

      try{
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        return savedUser;

      }catch(error){
        console.error('Error creating New User: ', error);
        throw new Error('Failed to create New User')
      }
    },

    // Log In User

    logIn : async (parent, args) => {
      const {username, password} = args.input;

      console.log('Trying to Log In ...')
      console.log(`username: ${username}, password ${password}`)

      if(!username){
        console.log("Username Required");
        throw new Error("Username Required")
      }
      
      if(!password){
        console.log("Password Required");
        throw new Error("Password Required");
      }

      try{
        const user = await User.findOne({username});
        if (!user){
          console.error('User not Found');
          throw new Error('Invalid Username');
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
         
        if(!passwordCheck){
          console.error('Password Does Not Match')
          throw new Error('Invalid Password');
        }

        const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn:'1h'} )
        return {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          }
        };        


      } catch(error){
        console.error('Error in Connecting: ', error)
        throw new Error('Failed to Connect')
      }
    },
  
  },
};

module.exports = resolvers;
