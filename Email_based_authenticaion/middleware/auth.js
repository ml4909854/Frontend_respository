

const jwt = require("jsonwebtoken")
const User = require("../model/user.model.js")
const blackList = require("../blackList")

const auth = async(req , res , next)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(blackList.has(token)){
            return res.status(400).json({message:"user logged out! Please login again."})
        }
        const decoded = jwt.verify(token , "masai")
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        console.log(req.user)
        next()
    } catch (error) {
        res.status(500).json({message:"error to generate token" , Error:error})
    }
}

module.exports = auth