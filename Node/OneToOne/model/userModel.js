const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  profileId: { type: mongoose.Types.ObjectId, ref: "Profile" }
});

module.exports = mongoose.model("User", UserSchema);
