
require('dotenv').config()
const mongoose = require("mongoose")
const mongoURL = process.env.MONGO_URI

module.exports =async ()=>{
     try {
        await mongoose.connect(mongoURL)
        console.log("database connected!")
     } catch (error) {
        console.log(error , "Error to connect db!")
     }
}
