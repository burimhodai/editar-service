const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    email: String,
    password: String,
    logo: String,
    accessLevel: { type: String, default: "admin" }, // Full access
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", schoolSchema);
