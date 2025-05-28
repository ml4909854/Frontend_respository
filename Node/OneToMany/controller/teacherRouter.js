const express = require("express");
const router = express.Router();
const TeacherModel = require("../model/teacherModel.js");
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const newTeacher = new TeacherModel(req.body);
    const savedTeacher = await newTeacher.save();
    res
      .status(201)
      .json({ message: "teacher saved successfully!", Teacher: savedTeacher });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get
router.get("/", async (req, res) => {
  try {
    const Teacher = await TeacherModel.find().populate("students");
    if (!Teacher) {
      res.status(404).json({ message: "No teachers found" });
    }
    res.status(200).json({ message: "All teacher List", Teacher: Teacher });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get/:id

router.get("/:id", async (req, res) => {
  try {
    const TeacherId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(TeacherId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const findTeacher = await TeacherModel.findById(TeacherId);
    if (!findTeacher) {
      res.status(404).json({ message: "No teacher Found" });
    }
    res.status(200).json({ message: "UpdateTeacher!", Teacher: findTeacher });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// patch

router.patch("/:id", async (req, res) => {
  try {
    const TeacherId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(TeacherId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const UpdateTeacher = await TeacherModel.findByIdAndUpdate(
      TeacherId,
      req.body,
      {
        new: true,
      }
    );
    if (!UpdateTeacher) {
      res.status(404).json({ message: "No teacher Found" });
    }
    res.status(200).json({ message: "UpdateTeacher!", Teacher: UpdateTeacher });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    const TeacherId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(TeacherId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const deleteTeacher = await TeacherModel.findByIdAndDelete(TeacherId);
    if (!deleteTeacher) {
      res.status(404).json({ message: "No teacher Found" });
    }
    res.status(200).json({ message: "deleteTeacher!", Teacher: deleteTeacher });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
