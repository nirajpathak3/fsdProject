const express = require('express')
const axios = require('axios');
const cors = require('cors');
const users = require('./src/users');

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/users', users.getUsers); // using to get all users

app.listen(process.env.port, ()=>{
    console.log("Listening port...", process.env.port)
})