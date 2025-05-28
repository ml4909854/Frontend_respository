const express = require("express");
const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
  const userdata = req.body;
  try {
    // now first step to hash the password
    const hashPassword = await bcrypt.hash(userdata.password, 5);

    const newUser = new UserModel({ ...userdata, password: hashPassword });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "user registerd successfully!", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//login router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: "user not registered. Please register first!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(404).json({ message: "password is wrong" });
    }
    const token = jwt.sign({ email, id: user._id }, "masai");
    res.status(201).json({
      message: `${user.name} login successfully!`,
      token,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
