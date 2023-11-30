// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    currentUser: String
    products: [Product]  # New query to get a list of products
  }

  type Mutation {
    createUser(username: String!): User
    createProduct(name: String!, price: Float!, description: String): Product  # New mutation to create a product
  }

  type User {
    id: ID!
    username: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }
`;

module.exports = typeDefs;
