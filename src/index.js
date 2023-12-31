// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const auth = require('./auth');
const cors = require('cors');


// Load environment variables from .env
require('dotenv').config();

const app = express();

// Setting up Cors
app.use(cors());

// Parsing JSON request
app.use(express.json());

// Console Log the Incoming Request from The Front
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  console.log(req.body)
  next();
});


console.log('MONGODB_URI:', process.env.MONGODB_URI);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(`Error connecting to MongoDB: ${error}`));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //context: ({ req }) => ({ user: auth.verifyToken(req) }),
  debug: true,

});

// Start the Apollo Server before applying middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Error handling for unauthorized access
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
