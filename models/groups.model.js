const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    users: {
        type: Array,
        required: true,
        default: []
    },
    groupID: {
        type: Number,
        required: true,
    },
    full: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

module.exports = group = mongoose.model("group", groupSchema);