// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const { register, login, authenticateToken } = require('./src/auth/auth');
const User = require('./src/models/User');

require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes
app.post('/api/register', register);
app.post('/api/login', login);

app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
