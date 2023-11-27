// import schema 
const { typeDefs } = require('./schema'); 


// resolvers.js
const resolvers = {
    Query: {
      // Define your queries here
      currentUser: (parent, args, { user }) => {
        if (user) {
          return `Hello, ${user.username}!`;
        }
        return 'Not authenticated';
      },
    },
    Mutation: {
      // Define your mutations here
    },
  };
  
  module.exports = resolvers;
  