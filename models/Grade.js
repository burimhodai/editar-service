const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    grade: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grade", gradeSchema);
