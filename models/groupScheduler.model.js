const mongoose = require("mongoose");

const groupScheduleSchema = new mongoose.Schema({
    refreshOn: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "scheduler"
    },
}, { timestamps: true });

module.exports = group = mongoose.model("groupSchedule", groupScheduleSchema);