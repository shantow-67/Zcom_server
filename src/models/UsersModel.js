const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Assuming 'user' and 'admin' are the possible roles
    default: "user", // Default role is 'user'
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
