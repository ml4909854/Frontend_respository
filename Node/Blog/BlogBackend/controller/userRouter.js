require("dotenv").config();
const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const isAuthenticate = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");
const roles = require("../constants/roles");
const blackList = require("../blackList.js");
// Get all user only admin gets all user

router.get("/", isAuthenticate, checkAccess(roles.admin), async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json({ message: "Get all Users!", users: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get a specific user
router.get(
  "user/:id",
  isAuthenticate,
  checkAccess(roles.admin),
  async (req, res) => {
    try {
      const userId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid UserId" });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Specific User!", users: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);


function isStrongPassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return regex.test(password);
}

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    let newUser = await UserModel.findOne({ username });
    if (newUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Try different username." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const saltRounds = Number(process.env.SALTROUNDS);
    const hashpassword = await bcrypt.hash(password, saltRounds);

    newUser = new UserModel({ username, password: hashpassword, role });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: savedUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username and Password are Wrong || You are Not Registered User!" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is incorrect." }); // ✅ added return
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful!",
      accessToken,
      refreshToken,
      userId: user._id,
      username: user.username,
      role: user.role, // optional if you want frontend to know
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // ✅ clearer error message
  }
});


// logout
router.get("/logout", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    blackList.add(token);
  }
  res.status(200).json({ message: "Logout successfully!" });
});

module.exports = router;
