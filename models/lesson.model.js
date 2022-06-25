const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Lesson-"
    },
    id: {
        type: String,
        unique: true,
        required: false,
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
    showInterstitials: {
        type: Boolean,
        default: true,
        required: true,
    },
    showPercentCorrect: {
        type: Boolean,
        default: true,
        required: true,
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