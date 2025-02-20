const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    accessLevel: { type: String, default: "parent" }, // Can view child info, alerts, news
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", parentSchema);
