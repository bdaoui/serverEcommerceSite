// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    currentUser: String
  }

  type Mutation {
    createUser(username: String!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

module.exports = typeDefs;
