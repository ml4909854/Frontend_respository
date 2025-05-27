

const mongoose = require("mongoose")
const mongoUrl = "mongodb+srv://ml4909854:mahesh123@cluster0.b0ztogf.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("database is connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB