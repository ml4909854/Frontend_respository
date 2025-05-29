require("dotenv").config()
const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
// register user

router.post("/register", async (req, res) => {
  try {
    const userdata = req.body;
    const saltRounds = Number(process.env.SALTROUNDS)
    const hashPassword = await bcrypt.hash(userdata.password, saltRounds);
    const user = new UserModel({ ...userdata, password: hashPassword });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User registered Successfully!", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
     return res
        .status(404)
        .json({ message: "User not found! Please register first" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(404)
        .json({ message: "Password is wrong! Please enter correct password." });
    }

    const accessSecretKey = process.env.ACCESS_SECRET_KEY
    const refreshSecretKey = process.env.REFRESH_SECRET_KEY
    const accessToken =  jwt.sign({name:user.name, email , role:user.role } , accessSecretKey , {expiresIn:"30s"})
    const refreshToken =  jwt.sign({name:user.name, email , role:user.role } , refreshSecretKey , {expiresIn:"7d"})
  
    res.status(201).json({message:`${user.name} Logged successfully!` , accessToken , refreshToken})
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hi User!" });
});

module.exports = router;
