const mongoose = require("mongoose");

const mongoUrl = "mongodb://127.0.0.1:27017/OneToOne";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("database is connected!");
    } catch (error) {
        console.log("Error connecting to the database");
        console.log(error.message);
    }
};

module.exports = connectDB;
