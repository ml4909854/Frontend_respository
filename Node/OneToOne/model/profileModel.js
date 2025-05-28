const mongoose = require("mongoose");
const { type } = require("os");

const ProfileSchema = new mongoose.Schema({
    address:{type:String , required:true},
    nationality:{type:String , required:true}
});

module.exports = mongoose.model("Profile", ProfileSchema);
