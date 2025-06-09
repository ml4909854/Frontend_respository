const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpiresAt: {
    type: Date,  // Changed from String to Date
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);