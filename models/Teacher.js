const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: false,
      },
    ],
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    accessLevel: { type: String, default: "teacher" }, // Can manage students, grades, subjects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
