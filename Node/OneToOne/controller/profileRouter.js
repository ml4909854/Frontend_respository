const express = require("express");
const router = express.Router();
const ProfileModel = require("../model/profileModel.js");
const { mongo, default: mongoose } = require("mongoose")

router.post("/", async (req, res) => {
  try {
    const newProfile = new ProfileModel(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "Profile saved successfully!",
      savedProfile: savedProfile,
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
    const Profile = await ProfileModel.find();
    if (!Profile) {
      res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({ message: "Profiles get succesffully!", Profiles: Profile });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ProfileId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(ProfileId)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const findSingleProfile = await ProfileModel.findById(ProfileId);
    res
      .status(200)
      .json({ message: "findSingleProfile", findSingleProfile: findSingleProfile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const ProfileId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(ProfileId)) {
      res.status(400).json({ message: "Invalid Id" });
    }
    const updateProfile = await ProfileModel.findByIdAndUpdate(ProfileId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Profile updated successfully!", UpdatedProfile: updateProfile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ProfileId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(ProfileId)) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const deleteProfile = await ProfileModel.findByIdAndUpdate(ProfileId);
    res
      .status(200)
      .json({ message: "Profile deleted successfully", Delete: deleteProfile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
