const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({

    title:String,
    content: String,
    author: {
        type:String,
        enum: ["School", "Teacher"]
    },

}, {
    timestamps:true
})

module.exports = mongoose.model("News", newsSchema)