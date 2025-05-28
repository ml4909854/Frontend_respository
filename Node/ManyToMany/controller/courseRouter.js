const express = require("express");
const router = express.Router();
const CourseModel = require("../model/courseModel.js");
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    const savedCourse = await newCourse.save();
    res
      .status(201)
      .json({ message: "Course saved successfully!", Course: savedCourse });
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
    const Course = await CourseModel.find();
    if (!Course) {
      res.status(404).json({ message: "No Courses found" });
    }
    res.status(200).json({ message: "All Course List", Course: Course });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get/:id

router.get("/:id", async (req, res) => {
  try {
    const CourseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(CourseId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const findCourse = await CourseModel.findById(CourseId);
    if (!findCourse) {
      res.status(404).json({ message: "No Course Found" });
    }
    res.status(200).json({ message: "UpdateCourse!", Course: findCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// patch

router.patch("/:id", async (req, res) => {
  try {
    const CourseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(CourseId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const UpdateCourse = await CourseModel.findByIdAndUpdate(
      CourseId,
      req.body,
      {
        new: true,
      }
    );
    if (!UpdateCourse) {
      res.status(404).json({ message: "No Course Found" });
    }
    res.status(200).json({ message: "UpdateCourse!", Course: UpdateCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    const CourseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(CourseId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const deleteCourse = await CourseModel.findByIdAndDelete(CourseId);
    if (!deleteCourse) {
      res.status(404).json({ message: "No Course Found" });
    }
    res.status(200).json({ message: "deleteCourse!", Course: deleteCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
