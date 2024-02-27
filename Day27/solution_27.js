// Problem 27: Authentication Middleware

// Problem Statement: You are developing a web application
// with Node.js and Express, and you need to implement an
// authentication middleware to protect certain routes. The
// authentication should be token-based and support user
// roles (e.g., admin, regular user). Design a middleware
// function that verifies the authenticity of incoming
// requests and checks if the user has the required role to
// access certain routes.

// Solution:

const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const secret = 'mysecret';

app.use(express.json());

function authenticateAndAuthorize(req, res, next) {
    // Your implementation here
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username, role: 'admin' }, secret);
        res.json({ token });
    } else if (username === 'user' && password === 'user') {
        const token = jwt.sign({ username, role: 'user' }, secret);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/admin', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'Welcome admin' });
});

app.get('/user', (req, res) => {
    res.json({ message: 'Welcome user' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});