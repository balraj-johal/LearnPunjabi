const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const sessionSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    refreshToken: {
        type: [sessionSchema],
    },
    createdOn: { type: Date, required: false },
    progress: { type: Array }
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (document, retrn, options) {
        delete retrn.refreshToken
        return retrn
    },
})
userSchema.plugin(passportLocalMongoose)

module.exports = User = mongoose.model("user", userSchema);