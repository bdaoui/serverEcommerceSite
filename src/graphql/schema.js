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
    createProduct(name: String!, price: Float!, description: String): Product  # New mutation to create a product
    #addToCart(Product)
    #deleteFromCart()
    #editFromCart()
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
  }

  type CartItem {
    productId: ID!
    quantity: Int!
  }

  input CreateUserInput{
    username: String!
    email:String!
    password: String!
    cart: [CartItem]
  }
`;

module.exports = typeDefs;
