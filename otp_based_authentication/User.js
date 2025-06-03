// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: { type: String, unique: true },
});

module.exports = mongoose.model("User", userSchema);
