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
const User = require("../models/user.model");

const { 
    getNewToken, 
    getNewRefreshToken, 
    AUTH_COOKIE_OPTIONS,
    verifyToken,
    verifyRefreshToken
} = require("../authentication")

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
        username: req.body.username,
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
                progress: []
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
                            console.log(user);
                            res.cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS);
                            return res.status(201).json(user);
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
router.post("/login", (req, res) => {
    // validate user data
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // look for user in database
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ username: "no user found." });
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
            res.status(500).send(`Error: ${err}`);
        })
})

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
            return res.status(500).send(`Error: ${err}`);
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
                    return res.status(500).send(`Error: ${err}`);
                })
        }) 
        .catch(err => {
            console.log("err, ", err);
            return res.status(500).send(`Error: ${err}`);
        })

})

module.exports = router;