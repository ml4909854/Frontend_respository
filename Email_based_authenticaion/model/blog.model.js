const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model (one user)
    required: true,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
