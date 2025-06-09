require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user.model.js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const blackList = require("../blackList.js");

// POST /api/auth/send-otp
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate OTP - 6-digit random number as string
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Hash the OTP before saving
    const hashedOtp = await bcrypt.hash(otpCode, 10);
    // Set expiration time - 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Find user and update or create new user
    let user = await User.findOne({ email });
    if (user) {
      user.otp = hashedOtp;
      user.otpExpiresAt = expiresAt;
      await user.save();
    } else {
      user = new User({ email, otp: hashedOtp, otpExpiresAt: expiresAt });
      await user.save();
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP email", error });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if OTP expired
    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired!" });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    // OTP correct - clear OTP fields
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // Generate JWT token after successful verification
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "masai", // Use env JWT_SECRET or fallback
      { expiresIn: "1d" }                 // Token valid for 1 day
    );

    // Send success response with token
    return res.status(200).json({ message: "OTP verified successfully!", token });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

//  logout part 

router.get("/logout" , (req , res)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
      blackList.add(token)
    }
    res.status(200).json({message:"message logout successfully!"})
})
module.exports = router;
