const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

exports.REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    // // Since localhost does not have https protocol,
    // // secure cookies do not work correctly (in postman)
    // secure: !dev,
    // signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    // sameSite: "none",
}

// generate jwt token
exports.getToken = user => {
    return jwt.sign({
            _id : user._id,
            username : user.username,
        }, process.env.PASSPORT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY),
    });
}

// generate refresh token
exports.getRefreshToken = user => {
    const refreshToken = jwt.sign({user : user, message: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
    });
    return refreshToken;
}

// export verify user middleware
exports.verifyUser = passport.authenticate();
// exports.verifyUser = passport.authenticate("jwt", { session: false });
