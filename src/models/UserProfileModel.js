const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model if applicable
    },
  ],
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
