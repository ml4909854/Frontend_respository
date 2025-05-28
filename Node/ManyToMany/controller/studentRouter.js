const express = require("express");
const router = express.Router();
const StudentModel = require("../model/studentModel.js");
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);
    const savedStudent = await newStudent.save();
    res
      .status(201)
      .json({ message: "Student saved successfully!", Student: savedStudent });
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
    const Student = await StudentModel.find()
    if (!Student) {
      res.status(404).json({ message: "No Students found" });
    }
    res.status(200).json({ message: "All Student List", Student: Student });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get/:id

router.get("/:id", async (req, res) => {
  try {
    const StudentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(StudentId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const findStudent = await StudentModel.findById(StudentId);
    if (!findStudent) {
      res.status(404).json({ message: "No Student Found" });
    }
    res.status(200).json({ message: "UpdateStudent!", Student: findStudent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// patch

router.patch("/:id", async (req, res) => {
  try {
    const StudentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(StudentId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const UpdateStudent = await StudentModel.findByIdAndUpdate(
      StudentId,
      req.body,
      {
        new: true,
      }
    );
    if (!UpdateStudent) {
      res.status(404).json({ message: "No Student Found" });
    }
    res.status(200).json({ message: "UpdateStudent!", Student: UpdateStudent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    const StudentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(StudentId)) {
      res.status(404).json({ message: "Invalid User Id" });
    }
    const deleteStudent = await StudentModel.findByIdAndDelete(StudentId);
    if (!deleteStudent) {
      res.status(404).json({ message: "No Student Found" });
    }
    res.status(200).json({ message: "deleteStudent!", Student: deleteStudent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
