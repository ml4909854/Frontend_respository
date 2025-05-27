const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel.js");
const { default: mongoose, mongo } = require("mongoose");
// const userModel = require("../model/userModel.js")

//  now first step to create a new user

router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully!",
      user: { id: savedUser._id, email: savedUser.email },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

//now second step is to created a request now Its a time to create a request for get all the routes

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); // Exclude sensitive fields
    res.status(200).json({
      message: "All users fetched successfully!",
      users: users, // Changed key to plural
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      error: "Internal server error", // Standardized error key
    });
  }
});

//  get a Individual by An Id

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const findUser = await UserModel.findById(userId);

    if (!findUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: findUser });
  } catch (error) {
    res.status.json({ error: "Internal Server Error" });
  }
});

// now try to fetch the data with req.querry with name
// router.get("/", async (req, res) => {
//   try {
//     const name = req.query.name
//     const filter = {}
//     filter.name = name
//     console.log(filter)
//     const user = await UserModel.findOne(filter);
//     console.log(user)
//    res.status(200).json({message:"feteched succesfully" , user:user})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// / this endpoint is for update

router.patch("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      res.status(400).send("Invalid userId");
    }

    const upadateUser = await UserModel.findByIdAndUpdate(userID, req.body, {
      new: true,
    });
    if (!upadateUser) {
      res.status(404).json({ message: "user not found" });
    }
    res
      .status(200)
      .json({ message: "user updated Sucessfully!", upadateUser: upadateUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete endpoint

router.delete("/:id",async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: "Invalid url" });
    }

    const deleteUser = await UserModel.findByIdAndDelete(userId)
    if(!deleteUser){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"user delelted succesffully" , deleteUser:deleteUser})
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
