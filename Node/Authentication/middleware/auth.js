const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token  = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found or expired" });
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
