const Validator = require("validator");
const isEmpty = require("is-empty");
const Filter = require("bad-words");

const swearFilter = new Filter();

module.exports = function validateRegister(data) {
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
    if (swearFilter.isProfane(data.username)) {
        errors.username = "Please ensure you don't use bad language."
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!(data.password === data.confirmPassword)) {
        errors.confirmPassword = "Passwords must be equal";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "email is required"
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "Please enter a valid email"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};