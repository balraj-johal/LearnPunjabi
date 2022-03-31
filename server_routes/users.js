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
const crypto = require('crypto');

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const validatePassword = require("../validation/password");

const User = require("../models/user.model");
const Group = require("../models/groups.model");

const {
    getNewToken, 
    getNewRefreshToken, 
    AUTH_COOKIE_OPTIONS,
    verifyToken,
    verifyRefreshToken,
} = require("../authentication");

const { 
    sendVerifCodeEmail,
    sendPWResetEmail
} = require("../email");


/**
 * Generates cryptographically secure random string of specified length
 * @name genVerificationCode
 * @param  {Number} length
 * @returns {String} code
 */
let genVerificationCode = (length) => {
    let code = crypto
        .randomBytes(length)
        .toString('base64')
        .slice(0, length)
    return escape(code);
}

/**
 * Register a new user.
 * @name post/
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/", (req, res) => {
    //validate userData
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //look for user in db by username
    User.findOne({
        username: {$eq: req.body.username},
    }).then(user => {
        if (user) { 
            //if found
            return res.status(400).json({
                username: "User already exists!"
            });
        } else { 
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
            // salt and hash pw
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    // generate refresh token and save to user
                    const refreshToken = getNewRefreshToken(newUser._id);
                    newUser.refreshToken.push({refreshToken});
                    // save user to random leaderboard group
                    Group.count()
                        .then(count => {
                            let randomIndex = Math.floor(Math.random() * count)
                            // query all users but only fetch document offset by the random index
                            Group.findOne().skip(randomIndex)
                                .then(group => {
                                    group.users.push({
                                        username: newUser.username,
                                        _id: newUser._id,
                                        weeklyXP: 0
                                    });
                                    group.save()
                                        .catch(err => { console.log(err); })
                                    newUser.groupID = group.groupID;

                                    /**
                                     * // TODO:
                                     * after 12 hours
                                     *      if user.status === Pending
                                     *          delete user
                                     */

                                    // save user to db
                                    newUser
                                        .save()
                                        .then(user => {
                                            sendVerifCodeEmail({
                                                recipient: user.email,
                                                code: user.verificationCode,
                                                host: req.get('host')
                                            });
                                            return res.status(201).json({
                                                message: `Check ${user.email} for a verification link!`
                                            });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(500).json({
                                                registration: "Error creating user."
                                            });
                                        })
                                })
                        })
                })
                if (err) {
                    return res.status(500).json({
                        registration: "Error creating user."
                    });
                }
            })
        }
    })
})


/**
 * Login user if credentials are valid.
 * @name post/login
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/login", (req, res) => {
    // validate user data
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // look for user in database
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: {$eq: username} })
        .then(user => {
            if (!user) {
                return res.status(404).json({ username: "no user found." });
            } else if (user.status !== "Active") {
                return res.status(401).json({ verification: "Please verify your email first!" });
            } else {
                // check password against stored hash
                bcrypt
                    .compare(password, user.password) 
                    .then(isMatch => {
                        if (isMatch) {  
                            // generate new refresh token and store in user entry
                            const newRefreshToken = getNewRefreshToken(user._id);
                            user.refreshToken.push({ refreshToken: newRefreshToken });
                            user
                                .save()
                                .then(saveResult => {
                                    const token = getNewToken( saveResult._id );
                                    res.cookie("refreshToken", newRefreshToken, AUTH_COOKIE_OPTIONS);
                                    res.cookie("jwtToken", token, AUTH_COOKIE_OPTIONS);
                                    return res.send({
                                        success: true,
                                        userID: saveResult._id
                                    });
                                });
                        } else {
                            return res
                                .status(400)
                                .json({ password: "Wrong password." });
                        }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
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
 router.post("/forgot-password", forgotPasswordLimiter,  (req, res) => {
    // look for user in database
    const email = req.body.email;
    User.findOne({ email: {$eq: email} })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "no user found." });
            } else {
                let code = genVerificationCode(8);
                user.pwResetCode = code;
                user.pwResetCodeExpiry = Date.now() + (3 * 60 * 1000) // 3 mins from now 
                user.save((err, user) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        sendPWResetEmail({
                            recipient: user.email,
                            code: user.pwResetCode,
                            host: req.get('host')
                        })
                        return res.send({ 
                            success: true,
                            // code: user.pwResetCode,
                            message: "Password reset link set!"
                        })
                    }
                })
            }
        })
        .catch(err => {
            // TODO: should a success message be faked here? 
            // i.e. should we say if an email isn't found or not
            console.log(err);
            res.status(500).json(err)
        })
}); 
/**
 * Resets password if code is valid
 * @name post/resetPassword
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
 router.post("/reset-password/:resetCode", (req, res) => {
    // console.log("reset pw called");
    // look for user in database
    const code = req.params.resetCode;
    // console.log(code);
    User.findOne({ 
        pwResetCode: {$eq: code},
        email: {$eq: req.body.email},
        pwResetCodeExpiry: {$gt: Date.now()}
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ 
                    error: "Password reset token is invalid or has expired." 
                });
            } else {
                console.log(`code; ${user.pwResetCode}, expiry ${user.pwResetCodeExpiry.toString()}`)
                const password = req.body.newPW;
                //validate userData
                const { errors, isValid } = validatePassword({ password: password });
                if (!isValid) { return res.status(400).json(errors); }
                // salt and hash pw
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) { throw err; }
                        user.password = hash;
                        user.pwResetCodeExpiry = Date.now() - 100000;
                        user.pwResetCode = genVerificationCode(8);
                        // save user to db
                        user
                            .save()
                            .then(user => { return res.status(201).json({}); })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: "Error saving password."
                                });
                            })
                    })
                    if (err) {
                        return res.status(500).json({
                            error: "Error salting new password."
                        });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
}); 

/**
 * If user is verified, get user's data (that is publically accessible);
 * @name get/data
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/data", (req, res, next) => {
    verifyToken(req)
        .then(user => {
            return res.send({
                user: {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    progress: user.progress,
                    groupID: user.groupID,
                    weeklyXP: user.weeklyXP,
                    XP: user.XP
                }
            })
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
})

 router.get("/adminRoleTest", (req, res, next) => {
    verifyToken(req)
        .then(user => {
            if (user.role === "Admin") {
                res.status(200).send("success");
            } else {
                return res.status(401).send({
                    error: "User does not have correct role for this resource."
                });
            }
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
})
 router.get("/userRoleTest", (req, res, next) => {
    verifyToken(req)
        .then(user => {
            if (user.role === "User" || user.role === "Admin") {
                res.status(200).send("success");
            } else {
                return res.status(401).send({
                    error: "User does not have correct role for this resource."
                });
            }
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
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
                if (storedToken === cookieRefreshToken) {
                    tokenIndex = count;
                }
                count++;
            });
            // if the refresh token is not present in the user's db entry
            if (tokenIndex == -1) {
                console.log("refresh token not present in user db")
                res.status(401).send("Unauthorized1")
            } else {
                // generate new jwt token
                const token = getNewToken( user._id )
                // create new refresh token and save in user's db entry
                const newRefreshToken = getNewRefreshToken(user._id)
                // replace old refresh token with the new token
                user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                // save user
                user.save((err, user) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        // send new jwt token and store refresh token in cookies
                        res.cookie("refreshToken", newRefreshToken, AUTH_COOKIE_OPTIONS);
                        res.cookie("jwtToken", token, AUTH_COOKIE_OPTIONS);
                        return res.send({ 
                            success: true,
                            userID: user._id
                            // token: "Bearer " + token
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        })
})

/**
 * If supplied refreshToken is valid, generate new JWT and refreshToken
 * @name post/logout
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/logout", (req, res, next) => {
    verifyToken(req)
        .then(user => {
            let tokenIndex = -1;
            let count = 0;
            let cookieRefreshToken = req.cookies.refreshToken;
            if (cookieRefreshToken) {
                user.refreshToken.forEach(element => {
                    storedToken = element.refreshToken;
                        if (storedToken === cookieRefreshToken) {
                            tokenIndex = count;
                        }
                    count++;
                });
            } else {
                return res.status(401).send("refresh token not present.")
            }
            // if refresh token is present, delete the token
            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }
            // save user
            user.save((err, result) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    // delete refresh token from cookies
                    res.clearCookie("refreshToken", AUTH_COOKIE_OPTIONS)
                    res.clearCookie("jwtToken", AUTH_COOKIE_OPTIONS)
                    return res.send({ success: true })
                }
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err });
        })
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
router.get("/verify-email/:verificationCode", (req, res, next) => {
    console.log("checking verification code: ", req.params.verificationCode);
    User.findOne({ verificationCode: {$eq: req.params.verificationCode} })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found..." })
            }
            user.status = "Active";
            user.save()
                .then(savedUser => {
                    return res.status(200).send({}); 
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({ error: err });
                })
        })
})

module.exports = router;