const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    birthNumber: String,
    password: String,
    gradeLevel: String,
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    accessLevel: { type: String, default: "student" }, // Can view grades, subjects, news
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
