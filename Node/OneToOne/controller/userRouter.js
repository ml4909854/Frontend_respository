const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel.js");
const { mongo, default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User saved successfully!",
      savedUser: savedUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find().populate("profileId");
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "users get succesffully!", users: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid Id" });
    }
    const findSingleUser = await UserModel.findById(userId).populate("profileId");
    res
      .status(200)
      .json({ message: "findSingleuser", findSingleUser: findSingleUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid Id" });
    }
    const updateUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "User updated successfully!", UpdatedUser: updateUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const deleteUser = await UserModel.findByIdAndUpdate(userId);
    res
      .status(200)
      .json({ message: "user deleted successfully", Delete: deleteUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
