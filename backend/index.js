const express = require('express')
const axios = require('axios');
const cors = require('cors');
const users = require('./src/users');
const posts = require('./src/posts');

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

/// Logger Middleware is defined here
const loggerMiddleware = (req, res, next) =>{
  console.log(`${req.method}`);
  next();
}
app.use(loggerMiddleware);

//// Routes are defined here
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/users', loggerMiddleware, users.getUsers); // using to get all users

app.get('/api/posts', loggerMiddleware, posts.getPosts); // using to get all users

//// Server is started here
app.listen(process.env.port, ()=>{
    console.log("Listening port...", process.env.port)
})