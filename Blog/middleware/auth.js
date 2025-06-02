const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
const blackList = require("../balckList.js");
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers?.auth?.split(" ")[1];
    if(blackList.has(token)){
        return res.status(400).json({message:"user Logged out! Please Login again"})
    }
    

    const decode = jwt.verify(token , "accessToken")
    req.user = await User.findById(decode._id)
    next()
  } catch (error) {
    res.status(500).json({ error: error.message  , message:"Invalid or expired token"});
  }
};

module.exports = isAuth
