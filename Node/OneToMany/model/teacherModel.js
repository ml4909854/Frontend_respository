const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
