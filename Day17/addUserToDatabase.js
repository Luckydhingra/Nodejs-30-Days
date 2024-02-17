const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB (assumed you already have MongoDB running locally or elsewhere)
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Function to add a new user to the MongoDB database
async function addUserToDatabase(user) {
  try {
    // Create a new User instance based on the provided user object
    const newUser = new User(user);
    // Save the new user to the database
    await newUser.save();
    console.log("User added successfully:", newUser);
  } catch (error) {
    console.error("Error adding user to database:", error);
  }
}

// Example usage:
const user = {
  username: "example_user",
  email: "user@example.com"
};

addUserToDatabase(user);