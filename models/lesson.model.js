const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Lesson-"
    },
    strId: {
        type: String,
        unique: true,
        required: false,
    },
    requiredCompletions: {
        type: Number,
        required: true,
    },
    shuffle: {
        type: Boolean,
        default: false,
        required: false,
    },
    noToSample: {
        type: Number,
        required: false,
    },
    tasks: {
        type: Array,
        required: true,
        default: []
    },
}, { timestamps: true });

module.exports = lesson = mongoose.model("lesson", lessonSchema);