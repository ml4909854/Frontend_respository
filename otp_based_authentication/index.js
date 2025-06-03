// server.js
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./User");
const otpStore = require("./otpStore");
require("./db");

const app = express();
app.use(bodyParser.json());

// Step 1: Register User
app.post("/register", async (req, res) => {
  const { firstName, lastName, mobile } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ mobile });
  if (existingUser) {
    return res.json({ message: "User already registered. Please log in." });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  console.log(`OTP for ${mobile}: ${otp}`); // Simulate SMS

  res.json({ message: "OTP sent to your mobile. Please verify." });
});

// Step 2: Verify OTP and Create User
app.post("/verify-register", async (req, res) => {
  const { firstName, lastName, mobile, otp } = req.body;

  if (otpStore[mobile] !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Remove OTP from memory
  delete otpStore[mobile];

  // Save user
  const newUser = new User({ firstName, lastName, mobile });
  await newUser.save();

  res.json({ message: "User registered successfully!" });
});

// Step 3: Login User
app.post("/login", async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) {
    return res.status(404).json({ message: "User not found. Please register." });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  console.log(`Login OTP for ${mobile}: ${otp}`); // Simulate SMS

  res.json({ message: "OTP sent. Please verify to log in." });
});

// Step 4: Verify Login
app.post("/verify-login", async (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[mobile];
  res.json({ message: "User logged in successfully!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
