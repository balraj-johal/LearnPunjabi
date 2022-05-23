/**
 * @module api/users
 */
const express = require("express");
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
const router = express.Router();
const bcrypt = require("bcryptjs");
const rateLimit = require('express-rate-limit');

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const validatePassword = require("../validation/password");

const User = require("../models/user.model");
const Group = require("../models/groups.model");

const {
    AUTH_COOKIE_OPTIONS,
    getNewToken, 
    getNewRefreshToken, 
    verifyToken,
    verifyRefreshToken,
} = require("../utilities/authentication");

const { 
    sendVerifCodeEmail,
    sendPWResetEmail
} = require("../utilities/email");

const { genVerificationCode } = require("../utilities/cryptography");

/**
 * Register a new user.
 * @name post/
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/", async (req, res) => {
    //validate userData
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) return res.status(400).json(errors);
    console.log(isValid, " : ", errors)
    try {
        // attempt to find user
        let user = await User.findOne({ username: {$eq: req.body.username} });
        if (user) return res.status(400).json({ username: "User already exists!" });
        // if not found, create new user
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            createdOn: req.body.createdOn,
            progress: [],
            verificationCode: genVerificationCode(8),
            role: 'User',
            pwResetCode: genVerificationCode(8),
            pwResetCodeExpiry: Date.now(),
        })
        // salt, hash and save user password
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        // generate refresh token and save to user
        const refreshToken = getNewRefreshToken(newUser._id);
        newUser.refreshToken.push({refreshToken});
        // assign user to random leaderboard group
        let groupCount = await Group.count();
        let randomIndex = Math.floor(Math.random() * groupCount);
        let randGroup = await Group.findOne().skip(randomIndex);
        randGroup.users.push({
            username: newUser.username,
            _id: newUser._id,
            weeklyXP: 0
        });
        let savedGroup = await randGroup.save();
        newUser.groupID = savedGroup.groupID;
        // save user
        let savedUser = await newUser.save();
        // send user a verification email
        sendVerifCodeEmail({
            recipient: savedUser.email,
            code: savedUser.verificationCode,
            host: req.get('host')
        });
        return res.status(201).json({ message: `Check ${savedUser.email} for a verification link!` });
    } catch (err) { 
        console.log(err);
        return res.status(500).json({ registration: "Error creating user." }); }
})

/**
 * Login user if credentials are valid.
 * @name post/login
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/login", async (req, res) => {
    // validate user credentials
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(errors);
    try {
        const username = req.body.username;
        const password = req.body.password;
        // attempt to find user
        let user = await User.findOne({ username: {$eq: username} });
        if (!user) return res.status(404).json({ username: "no user found." });
        if (user.status !== "Active") return res.status(401).json({
            verification: "Please verify your email first!" 
        });
        // check if password is correct
        let isPWMatch = await bcrypt.compare(password, user.password);
        if (!isPWMatch) return res.status(400).json({ password: "Wrong password." });
        // generate new refresh token and store in user entry
        const newRefreshToken = getNewRefreshToken(user._id);
        user.refreshToken.push({ refreshToken: newRefreshToken });
        // save user
        let savedUser = await user.save();
        // set auth tokens in cookies
        const token = getNewToken(savedUser._id);
        res.cookie("refreshToken", newRefreshToken, AUTH_COOKIE_OPTIONS);
        res.cookie("jwtToken", token, AUTH_COOKIE_OPTIONS);
        return res.status(200).send({ message: `login for user ${savedUser._id} successful!` });
    } catch (err) { res.status(500).json(err); }
});


const forgotPasswordLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 30s
    max: 2,
	standardHeaders: true,
	legacyHeaders: false,
})

/**
 * Will send reset password link to user if email is valid.
 * @name post/forgotPassword
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/forgot-password", forgotPasswordLimiter, async (req, res) => {
try {
    let user = await User.findOne({ email: {$eq: req.body.email} });
    // if no user is found by that email
    if (!user) return res.status(404).json({ email: "Error finding user." });
    user.pwResetCode = genVerificationCode(8);
    user.pwResetCodeExpiry = Date.now() + (3 * 60 * 1000) // 3 mins from now 
    let savedUser = await user.save();
    sendPWResetEmail({
        recipient: savedUser.email,
        code: savedUser.pwResetCode,
        host: req.get('host')
    })
    return res.status(200).send({ message: "Password reset link sent!" })
} catch (err) { return res.status(500).send({ email: "Error finding user." }); }
}); 

/**
 * Resets password if code is valid
 * @name post/resetPassword
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
*/
router.post("/reset-password/:resetCode", async (req, res) => {
    try {
        let user = await User.findOne({ 
            pwResetCode: {$eq: req.params.resetCode},
            email: {$eq: req.body.email},
            pwResetCodeExpiry: {$gt: Date.now()}
        });
        if (!user) return res.status(404).json({ error: "Token is invalid or has expired." });
        
        // validate new password
        const newPassword = req.body.newPW;
        const { errors, isValid } = validatePassword({ password: newPassword });
        if (!isValid) return res.status(400).json(errors);

        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.pwResetCodeExpiry = Date.now() - 100000;
        user.pwResetCode = genVerificationCode(8);

        let savedUser = await user.save();
        if (savedUser) return res.status(201).json({});
        return res.status(500).json({ error: "Error saving password." });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * If user is verified, get user's data (that is publically accessible);
 * @name get/
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/", async (req, res) => {
    try {
        let user = await verifyToken(req);
        return res.send({
            user: {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                progress: user.progress,
                groupID: user.groupID,
                totalXP: user.totalXP,
                weeklyXP: user.weeklyXP,
                // XP: user.XP,
                role: user.role,
            }
        })
    } catch (err) {
        // TODO: correct request codes
        return res.status(500).send({ error: err })
    }
})

/**
 * If supplied refreshToken is valid, generate new JWT and refreshToken
 * @name post/refreshToken
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/refreshToken", (req, res, next) => {
    verifyRefreshToken(req)
        .then(resultObject => {
            let user = resultObject.user;
            let cookieRefreshToken = resultObject.refreshToken;
            // find the refresh token in the user's db entry
            let tokenIndex = -1;
            let count = 0;
            user.refreshToken.forEach(element => {
                storedToken = element.refreshToken;
                if (storedToken === cookieRefreshToken) tokenIndex = count;
                count++;
            });
            // if the refresh token is not present in the user's db entry
            if (tokenIndex == -1) {
                return res.status(401).send("Unauthorized");
            }
            // generate new jwt token
            const JWTtoken = getNewToken( user._id )
            // create new refresh token and save in user's db entry
            const newRefreshToken = getNewRefreshToken(user._id)
            // replace old refresh token with the new token
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            // save user
            user.save((err, user) => {
                if (err) return res.status(500).send(err);
                // send new jwt token and store refresh token in cookies
                res.cookie("refreshToken", newRefreshToken, AUTH_COOKIE_OPTIONS);
                res.cookie("jwtToken", JWTtoken, AUTH_COOKIE_OPTIONS);
                return res.status(200).send({ userID: user._id });
            })
        })
        .catch(err => { res.status(500).send({ error: err }); })
})

/**
 * If supplied refreshToken is valid, generate new JWT and refreshToken
 * @name post/logout
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/logout", async (req, res) => {
    try {
        let user = await verifyToken(req);
        let tokenIndex = -1;
        let count = 0;
        let cookieRefreshToken = req.cookies.refreshToken;
        if (!cookieRefreshToken) return res.status(401).send("Refresh token not present.");
    
        user.refreshToken.forEach(element => {
            storedToken = element.refreshToken;
            if (storedToken === cookieRefreshToken) tokenIndex = count;
            count++;
        });
        // if refresh token is present, delete the token
        if (tokenIndex !== -1) user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        // save user
        let savedUser = await user.save();
        // delete refresh token from cookies
        res.clearCookie("refreshToken", AUTH_COOKIE_OPTIONS);
        res.clearCookie("jwtToken", AUTH_COOKIE_OPTIONS);
        return res.status(200).send({ message: "Logout successful." });
    } catch (err) { return res.status(500).send(err.message); }
})

// TODO: urgent change to post 
/**
 * set user status to Active if the supplied email verification code is valid
 * @name get/verify-email
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/verify-email/:verificationCode", async (req, res) => {
    try {
        let user = await User.findOne({ verificationCode: {$eq: req.params.verificationCode} });
        if (!user) return res.status(404).send({ message: "User not found..." });
        user.status = "Active";
        let savedUser = await user.save();
        return res.status(200).send({ message: `Verification for ${savedUser.email} successful!` });
    } catch (err) { return res.status(500).send({ error: err }); }
})

module.exports = router;