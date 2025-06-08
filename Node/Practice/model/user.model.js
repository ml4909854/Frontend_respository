

const mongoose = require("mongoose")
const roles = require("../constants/roles")
const userShcema = new mongoose.Schema({
    username:{type:String , required:true},
    password:{type:String , required:true},
    role:{type:String , enum:[roles.author , roles.admin] , default:roles.author},
})

module.exports = mongoose.model("User" , userShcema)