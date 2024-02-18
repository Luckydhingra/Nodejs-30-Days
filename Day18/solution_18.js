// 18. Problem: Express Route with MongoDB Query

// Problem Statement: Create an Express route that retrieves
// all users from the MongoDB database and returns them as a
// JSON response.

// Solution:

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getAllUsers(req, res) {
    // Your implementation here
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}

app.get('/users', getAllUsers);

// Start Express Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Expected Output:

// 1. Return a JSON response with an array of user objects.

// Test Cases:

// 2. Access the route /users and check if the response contains
// the expected user data.

// Hint:

// Import Required Modules: Import the necessary modules, such as
// express, mongoose, and any other modules required for your
// application.

// Define User Model: If you haven't already, define a User schema
// and create a User model using Mongoose.

// Connect to MongoDB: Use Mongoose to connect to your MongoDB
// database. Ensure that the connection is established before
// defining your route.

// Create Express Route: Define an Express route using app.get()
// that listens for requests to /users.

// Implement Route Handler: In the route handler function
// (getAllUsers), use the User.find() method to retrieve all users
// from the database. Handle any errors that occur during the query.

// Return JSON Response: If the query is successful, send a JSON
// response containing the array of user objects. If there is an
// error, send an appropriate error response.

// Start Express Server: Finally, start your Express server and
// listen on a specific port (e.g., 3000).