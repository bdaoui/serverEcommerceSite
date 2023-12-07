// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    currentUser: String
    products: [Product]  # New query to get a list of products
    allUsers: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createProduct(input: CreateProductInput): Product  # New mutation to create a product
    logIn(input: LogInInput)
    #addToCart(Product)
    #deleteFromCart()
    #editFromCart()
  }


  type CartItem {
    productId: ID!
    quantity: Int!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    cart: [CartItem]
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image: String
  }

  input CreateUserInput{
    username: String!
    email:String!
    password: String!
  }
  
  input CreateProductInput{
    name: String!
    price: String!
    description: String
    image: String
  }

  input LogInInput{
    username: String!
    password: String!
  }
`;

module.exports = typeDefs;
