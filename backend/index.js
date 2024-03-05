const express = require('express')
const axios = require('axios');
const cors = require('cors');
const users = require('./src/users');

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

/// Logger Middleware is defined here
const loggerMiddleware = (req, res, next) =>{
  console.log("Hello...");
  next();
}
app.use(loggerMiddleware);

//// Routes are defined here
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/users', loggerMiddleware, users.getUsers); // using to get all users

//// Server is started here
app.listen(process.env.port, ()=>{
    console.log("Listening port...", process.env.port)
})