
const jwt  = require("jsonwebtoken")
const User = require("../model/user.model.js")
const blackList = require("../blackList.js")
const auth = async(req , res , next)=>{
  try {
    const accessToken = req.headers?.authorization?.split(" ")[1]
   if(blackList.has(accessToken)){
    return res.status(400).json({message:"User logged out! Please Login again."})
   }
   const decoded = jwt.verify(accessToken , "accessMasai")
   req.user = await User.findById(decoded._id)
   next()
  } catch (error) {
    res.status(500).json({message:"Invalid or expired token!" , error:error})
  }
}

module.exports = auth