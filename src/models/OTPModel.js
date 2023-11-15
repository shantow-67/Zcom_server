const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    // Set the expiration time for the OTP, adjust it based on your specific requirements
    default: function () {
      return new Date(+this.createdAt + 2 * 60 * 1000); // Default expiration is set to 2 minutes
    },
  },
});

const OTP = mongoose.model("otps", otpSchema);

module.exports = OTP;
