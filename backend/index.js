const express = require('express')
const axios = require('axios');
const cors = require('cors');
const { connectMongoDB } = require('./src/mongo');
const users = require('./src/usersMongo');
const posts = require('./src/posts');

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

/// Logger Middleware is defined here
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method}`);
  next();
}
app.use(loggerMiddleware);

//// Routes are defined here
app.get('/', function (req, res) {
  res.send('Hello World')
})

connectMongoDB()
  .then(db => {
    // Pass the MongoDB database object to the route handlers
    app.get('/api/users', async (req, res) => {
      const userdata = await users.getUsers(db);
      res.json(userdata);
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening port...", process.env.PORT || 3000)
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });

// app.get('/api/users', loggerMiddleware, users.getUsers); // using to get all users

// app.get('/api/posts', loggerMiddleware, posts.getPosts); // using to get all users

//// Server is started here
// app.listen(process.env.port, () => {
//   console.log("Listening port...", process.env.port)
// })