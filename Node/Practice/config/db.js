
const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/Practice"


const connectDB  = async()=>{
  try {
    await mongoose.connect(mongoUrl)
    console.log("db is connected")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB