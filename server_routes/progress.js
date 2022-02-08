const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const User = require("../models/user.model");


router.post("/update", (req, res) => { //TODO: ensure user is verified before allowing
    // retrieve refresh token from cookies
    let progressToAdd = req.body;
    let cookieRefreshToken = req.cookies.refreshToken; //TODO: is this safe? what is a httpOnly cookie and should it be used here?
    console.log("prtoadd, ", req.body)

    if (cookieRefreshToken) {
        try {
            // verify refresh token against REFRESH_TOKEN_SECRET and extract user id from it
            const payload = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            // find user 
            const userId = payload.user._id
            User.findOne({ _id: userId })
                .then(user => {
                    if (user) {
                        let lesson;
                        // if (user.progress.length > 1) { //TODO: fix this
                        //     lesson = user.progress.find(elem => elem.id === progressToAdd.id);
                        // }
                        user.progress.forEach(elem => {
                            if (elem != null) {
                                if (elem.id === progressToAdd.id) {
                                    lesson = elem;
                                }
                            }
                        })
                        if (lesson === undefined) {
                            user.progress.push(progressToAdd);
                        } else {
                            lesson = progressToAdd // TODO: figure out how to update a lesson's progress
                        }
                        user.save()
                            .then(saveRes => {
                                res.status(200).send({ newProgress: user.progress }); //TODO: should I return the whole object here?
                            })
                            // TODO: error handling here
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

module.exports = router;