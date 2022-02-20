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

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const validatePassword = require("../validation/password");
const User = require("../models/user.model");

const { 
    getNewToken, 
    getNewRefreshToken, 
    AUTH_COOKIE_OPTIONS,
    verifyToken,
    verifyRefreshToken
} = require("../authentication")

// TODO: consider replacing with more secure random code
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let genVerificationCode = (length) => {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters[Math.floor(Math.random() * characters.length )];
    }
    return code;
}

/**
 * Register a new user.
 * @name post/register
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/register", (req, res) => {
    //validate userData
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json({error: errors});
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
                    // save user to db
                    newUser
                        .save()
                        .then(user => {
                            // TODO: do I need to set refreshToken cookie here??
                            // res.cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS);
                            return res.status(201).json({code: user.verificationCode});
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                registration: "Error creating user."
                            });
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
                            console.log("pw match")
                            // generate new refresh token and store in user entry
                            const newRefreshToken = getNewRefreshToken(user._id);
                            user.refreshToken.push({ refreshToken: newRefreshToken });
                            user
                                .save()
                                .then(saveResult => {
                                    const token = getNewToken( user._id );
                                    res.cookie("refreshToken", newRefreshToken, AUTH_COOKIE_OPTIONS);
                                    res.cookie("jwtToken", token, AUTH_COOKIE_OPTIONS);
                                    return res.send({
                                        success: true,
                                        userID: user._id
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


/**
 * Will send reset password link to user if email is valid.
 * @name post/forgotPassword
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
 router.post("/forgot-password", (req, res) => {
    // look for user in database
    const email = req.body.email;
    User.findOne({ email: {$eq: email} })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "no user found." });
            // } else if (user.status !== "Active") {
            //     return res.status(401).json({ verification: "Please verify your email first!" });
            } else {
                let code = genVerificationCode(8);
                user.pwResetCode = code;
                user.pwResetCodeExpiry = Date.now() + (10 * 60 * 1000) // 10 mins from now 
                user.save((err, user) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        return res.send({ 
                            success: true,
                            code: user.pwResetCode
                        })
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
 * Resets password if code is valid
 * @name post/resetPassword
 * @function
 * @memberof module:api/users~usersRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
 router.post("/reset-password/:resetCode", (req, res) => {
    // look for user in database
    const code = req.params.resetCode;
    console.log(code)
    User.findOne({ pwResetCode: {$eq: code} }) // , pwResetCodeExpiry: {$gt: Date.now()}
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Password reset token is invalid or has expired." });
            // } else if (user.status !== "Active") {
            //     return res.status(401).json({ verification: "Please verify your email first!" });
            } else {
                const password = req.body.password;
                //validate userData
                const { errors, isValid } = validatePassword({ password: password });
                if (!isValid) {
                    return res.status(400).json({error: errors});
                }
                // salt and hash pw
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        user.password = hash;
                        // save user to db
                        user
                            .save()
                            .then(user => {
                                return res.status(201).json({});
                            })
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
            return res.send({ // TODO: whitelist properties here
                user: {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    progress: user.progress
                }
            })
        })
        .catch(err => {
            return res.status(500).send(err);
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

/** Update user proress by changing lesson status by lesson id
 * @param  {String} path "/update-progress"
 */
router.post("/update-progress", (req, res) => {
    verifyToken(req)
        .then(user => {
            let lessonID = req.body.lessonID;
            let lesson;
            // check if lesson object is already present
            user.progress.forEach(storedLesson => {
                if (storedLesson != null) {
                    if (storedLesson.id === lessonID) {
                        lesson = storedLesson;
                        // update lesson object
                        storedLesson.timesCompleted = storedLesson.timesCompleted + 1;
                    }
                }
            })
            // if lesson not previously tracked begin tracking progress
            if (lesson === undefined) {
                user.progress.push({ id: lessonID, timesCompleted: 1 });
            }
            // notify mongoose that progress property has changed
            user.markModified("progress");
            // save user
            user.save()
                .then(savedUser => {
                    return res.status(200).send({ newProgress: savedUser.progress }); 
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({ error: err });
                })
        }) 
        .catch(err => {
            console.log("err, ", err);
            return res.status(500).send({ error: err });
        })

})

module.exports = router;