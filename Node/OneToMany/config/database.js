

const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/OneToMany"


const connectDB = async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("database is connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB