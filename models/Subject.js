const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
