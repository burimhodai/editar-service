const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: String,
      enum: ["School", "Teacher"],
    },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
