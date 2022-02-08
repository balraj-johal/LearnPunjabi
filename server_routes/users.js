const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const User = require("../models/user.model");

const { 
    getToken, 
    REFRESH_COOKIE_OPTIONS, 
    getRefreshToken, 
    verifyUser 
} = require("../authenticate")

router.post("/register", (req, res) => {
    console.log("register boyd: ", req.body)
    //validate userData
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json({error: errors});
    }
    //look for username in db
    User.findOne({
        username: req.body.username,
    }).then(user => {
        if (user) { //if found
            return res.status(400).json({error: "User already exists!"});
        } else { //if not found, create new user
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                createdOn: req.body.createdOn,
                progress: []
            })
            //salt and hash pw
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;          
                    const refreshToken = getRefreshToken({ _id: newUser._id });
                    newUser.refreshToken.push({refreshToken});
                    //save user to db
                    newUser
                        .save()
                        .then(user => {
                            console.log(user);
                            res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
                            return res.status(201).json(user);
                        })
                        .catch(err => console.log(err))
                })
                if (err) {
                    console.log(err);
                }
            })
        }
    })
})
router.post("/login", (req, res) => {
    // validate user data
    console.log("login go")
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        console.log("validation pass")
    }

    // look for user in database
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "no user found." });
            } else {
                // check password against stored hash
                bcrypt
                    .compare(password, user.password) 
                    .then(isMatch => {
                        if (isMatch) {  
                            console.log("pw match")
                            // generate new refresh token and store in user entry
                            const newRefreshToken = getRefreshToken({ _id: user._id });
                            user.refreshToken.push({ refreshToken: newRefreshToken });
                            user
                                .save()
                                .then(saveRes => {
                                    console.log("user saved")
                                    //create JWT payload
                                    const payload = {
                                        id: user.id,
                                        name: user.name,
                                        message: "login"
                                    };
                                    // sign jwt token
                                    jwt.sign( // TODO; refactor to use the getToken method from authenticate.js
                                            payload,
                                            process.env.PASSPORT_SECRET,
                                            {
                                                expiresIn: 15 * 60 // set expiry of session to 15 mins
                                            },
                                            (err, token) => {
                                                if (err) {
                                                    console.log('JWT Signing err: ', err);
                                                    res.status(500).json({ error: "JWT Signing error" })
                                                }
                                                console.log("jwt'd, ", token)
                                                res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);
                                                res.send({
                                                    success: true,
                                                    token: "Bearer " + token
                                                });
                                            }
                                        )
                                });
                        } else {
                            return res
                                .status(400)
                                .json({ error: "Wrong password." });
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
    // retrieve refresh token from cookies
    let cookieRefreshToken = req.cookies.refreshToken; //TODO: is this safe? what is a httpOnly cookie and should it be used here?
    
    if (cookieRefreshToken) {
        try {
            // verify refresh token against REFRESH_TOKEN_SECRET and extract user id from it
            const payload = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            // find user 
            const userId = payload.user._id
            User.findOne({ _id: userId })
                .then(user => {
                    if (user) {
                        res.send({
                            user: user
                        })
                    } else {
                        console.log("user not found")
                        res.status(401).send("Unauthorized2")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            console.log("error in jwt verify or user.find")
            res.status(401).send("Unauthorized3")
        }
    } else {
        console.log("cookie refresh token not present")
        res.status(401).send("Unauthorized4")
    }
})
router.post("/refreshToken", (req, res, next) => {
    // retrieve refresh token from cookies
    let cookieRefreshToken = req.cookies.refreshToken; //TODO: is this safe? what is a httpOnly cookie and should it be used here?
    
    if (cookieRefreshToken) {
        try {
            // verify refresh token against REFRESH_TOKEN_SECRET and extract user id from it
            const payload = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            // find user 
            const userId = payload.user._id
            User.findOne({ _id: userId })
                .then(user => {
                    if (user) {
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
                            const token = getToken( user )
                            // const token = getToken({ _id: userId })
                            // create new refresh token and save in user's db entry
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            // replace old refresh token with the new token
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            // save user
                            user.save((err, user) => {
                                if (err) {
                                    res.status(500).send(err)
                                } else {
                                    // send new jwt token and store refresh token in cookies
                                    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS)
                                    res.send({ 
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                }
                            })
                        }
                    } else {
                        console.log("user not found")
                        res.status(401).send("Unauthorized2")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            console.log("error in jwt verify or user.find")
            res.status(401).send("Unauthorized3")
        }
    } else {
        console.log("cookie refresh token not present")
        res.status(401).send("Unauthorized4")
    }
})
router.post("/logout", (req, res, next) => {
    // retrieve refresh token from cookies
    let cookieRefreshToken = req.cookies.refreshToken; //TODO: is this safe? what is a httpOnly cookie and should it be used here?
    // find user
    console.log("logging out user ", req.body)
    User.findById(req.body._id)
        .then(user => {
            if (user) {// find the refresh token in the user's db entry
                let tokenIndex = -1;
                let count = 0;
                user.refreshToken.forEach(element => {
                    storedToken = element.refreshToken;
                    if (storedToken === cookieRefreshToken) {
                        tokenIndex = count;
                    }
                    count++;
                });
                // if refresh token is present, delete the token
                if (tokenIndex !== -1) {
                    user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
                }
                // save user
                user.save((err, user) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        // delete refresh token from cookies
                        res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS)
                        res.send({ success: true })
                    }
                })
            } else {
                res.status(404).send("user not found");
            }
        },
        err => next(err)
        )
})

module.exports = router;