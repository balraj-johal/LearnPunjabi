const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};