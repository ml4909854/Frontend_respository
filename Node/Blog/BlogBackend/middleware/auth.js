require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model.js");
const blackList = require("../blackList.js");

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing from headers" });
    }

    // Check if token is blacklisted
    if (blackList.has(token)) {
      return res.status(401).json({
        message: "Session expired or user logged out. Please log in again.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    // Find user by ID
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token!",
      error: error.message,
    });
  }
};

module.exports = isAuthenticate;
