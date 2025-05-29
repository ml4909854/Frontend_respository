const jwt = require("jsonwebtoken");
const blackList = require("../blackList");

const isAuthenticated = (req, res, next) => {
  try {
    const token  = req.headers.authorization.split(" ")[1];
    if(blackList.has(token)){
      res.status(404).json({message:"You logged out!. Please login again"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "masai");
    req.user = decoded;
    console.log(req.user);
    next(); // Proceed to next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
