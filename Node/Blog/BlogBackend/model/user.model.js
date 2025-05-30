
const mongoose = require("mongoose")
const roles = require("../constants/roles")

const userSchema = new mongoose.Schema({
    username:{type:String , require:true},
    password:{type:String , require:true},
    role:{type:String , enum:[roles.admin , roles.author ,roles.reader ] , default:roles.reader}
},{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("user" , userSchema)