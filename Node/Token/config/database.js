require("dotenv").config()
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
