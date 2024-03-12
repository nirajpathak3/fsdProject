// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const { register, login, authenticateToken } = require('./src/auth/auth');
const User = require('./src/models/User');
const multer = require('multer');

require('dotenv').config();

const app = express();
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

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
        res.status(200).json({username:user.username, userId:user._id});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/upload', upload.single('avatar'), (req, res) => {
    console.log('File uploaded:', req.avatar);
    res.send('File uploaded successfully');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
