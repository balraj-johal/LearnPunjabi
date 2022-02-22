const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const sessionSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    firstName: { 
        type: String, 
        required: true 
    },
    createdOn: { 
        type: Date, 
        required: false 
    },
    progress: { 
        type: Array, 
        required: true 
    },
    refreshToken: {
        type: [sessionSchema],
        required: false
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending',
        required: true
    },
    verificationCode: { 
        type: String, 
        unique: true 
    },
    pwResetCode: {
        type: String, 
        unique: true,
        required: false
    },
    pwResetCodeExpiry: {
        type: Date,
        required: false
    },
    role: {
        type: String, 
        enum: ['User', 'Author', 'Admin'],
        default: 'User',
        required: true
    },
}, { timestamps: true });

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (document, retrn, options) {
        delete retrn.refreshToken
        return retrn
    },
})
userSchema.plugin(passportLocalMongoose)

module.exports = User = mongoose.model("user", userSchema);