const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    lessons: {
        type: Array,
        required: true,
        default: []
    },
    version: {
        type: Number,
        required: true,
        default: 0,
        unique: true
    }
}, { timestamps: true });

module.exports = course = mongoose.model("course", courseSchema);