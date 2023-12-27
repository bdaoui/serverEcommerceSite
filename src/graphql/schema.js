// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    currentUser: String
    products: [Product]  
    product(id: ID!): User 
    allUsers: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createProduct(input: CreateProductInput): Product 
    logIn(input: LogInInput) : AuthPayload
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
    password: String
    cart: [CartItem]
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image: String
  }

  type AuthPayload{
    token: String!
    user: User!
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
