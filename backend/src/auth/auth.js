// backend/src/auth/authMiddleware.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res, next) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = generateToken(user);
            res.json({token });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        next(error);
    }
}

function generateToken(user) {
    return jwt.sign({ username: user.username }, "ORGCGS$@AS22213123", { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decodedToken;
        next();
    });
}

module.exports = { register, login, authenticateToken };
