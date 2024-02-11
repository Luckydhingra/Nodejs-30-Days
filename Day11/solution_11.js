// 11. Problem: Express Authentication Middleware

// Problem Statement: Implement an authentication middleware for an Express
// application. The middleware should check for the presence of a valid JWT
// (JSON Web Token) in the request headers. If a valid token is present, allow
// the request to proceed; otherwise, return a 401 Unauthorized status.

// Solution:

const express = require('express');
const jwt = require('jsonwebtoken');
const secret = '3sc3RLrpd17';
const app = express();
const port = 3000;

const user = {
    id: 1,
    username: 'test',
    password: 'test'
};
console.log('Token:', jwt.sign(user, secret));

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    // Your implementation here
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            req.user = user;
            next();
        }
    });
}

const protected = (req, res) => {
    res.status(200).json({ message: 'User Authorized', user: req.user });
};

app.get('/protected', authenticationMiddleware, protected);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Test Cases:

// 1. Request with a valid JWT should proceed.
// 2. Request without a JWT or with an invalid JWT should return a 401 Unauthorized status.