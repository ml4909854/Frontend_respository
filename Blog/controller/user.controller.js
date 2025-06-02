const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackList = require("../balckList");

// get all user. Only admin can see all the users no one can't see the users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (user.length === 0) {
      return res.status(404).json({ message: "No user found!" });
    }
    res.status(200).json({ message: "Get all users", user: user });
  } catch (error) {
    res.status(500).send({ erorr: error.message });
  }
});

// register a user

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already found" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashPassword, role });
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "user registered succesffully!", user: savedUser });
  } catch (error) {
    res.status.json({ error: error.message });
  }
});

// login router

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Please register first!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(400).json({ message: "Password is Incorrect" });
    }

    const accessToken = jwt.sign({ _id: user._id }, "accessToken", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ _id: user._id }, "refreshToken", {
      expiresIn: "30d",
    });

    res
      .status(200)
      .json({
        message: "Login successfully!",
        accessToken,
        refreshToken,
        userId: user._id,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// logout code write a logout code 

router.get("/logout" , (req ,res)=>{
    try {
        const token = req.headers?.auth?.split(" ")[1]
        if(token){
           blackList.add(token)
        }
        res.status(200).json({message:"logout successfully!"})
    } catch (error) {
        
    }
})

module.exports = router;
