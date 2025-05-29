
require("dotenv").config()
const jwt = require("jsonwebtoken")
const blackList = require('../blackList.js')
const isAuthenticate = (req, res, next) => {
  try {
       
    const token = req.headers.authorization.split(" ")[1]
    if(blackList.has(token)){
        return res.status(401).json({message:"user logged out!, Please login again"})
    }
    const accessSecretKey = process.env.ACCESS_SECRET_KEY
    const decoded = jwt.verify(token , accessSecretKey)
    req.user = decoded
    next()

  } catch (error) {
    res.status(500).json({message:"Invalid or expired token!" , error:error})
  }
};
module.exports = isAuthenticate
