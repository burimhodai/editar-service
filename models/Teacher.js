const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  accessLevel: { type: String, default: "teacher" }, // Can manage students, grades, subjects
});

module.exports = mongoose.model("Teacher", teacherSchema);
