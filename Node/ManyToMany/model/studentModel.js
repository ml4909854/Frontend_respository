const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
