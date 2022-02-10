const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const User = require("../models/user.model");

const LESSONS = [
    {
        name: "line 1",
        id: "1",
        tasks: [
            {
                id: "1",
                text: "butt1"
            },
            {
                id: "2",
                text: "butt2"
            },
            {
                id: "3",
                text: "butt3"
            },
        ]
    },
    {
        name: "line 2",
        id: "2",
        tasks: [
            {
                id: "1",
                text: "buttttt1"
            },
            {
                id: "2",
                text: "buttttt2"
            },
            {
                id: "3",
                text: "buttttt3"
            },
        ]
    },
    {
        name: "line 3",
        id: "3",
        tasks: [
            {
                id: "1",
                text: "bu3tt1"
            },
            {
                id: "2",
                text: "but3ttt2"
            },
            {
                id: "3",
                text: "33"
            },
        ]
    },
]

let getLessonById = (id) => {
    console.log("Looking for ", id)
    let result = LESSONS.find(lesson => lesson.id === id);
    return result;
}

router.post("/get-by-id", (req, res) => { //TODO: ensure user is verified before allowing
    // retrieve refresh token from cookies
    let cookieRefreshToken = req.cookies.refreshToken; //TODO: is this safe? what is a httpOnly cookie and should it be used here?
    console.log("id to get, ", req.body)
    let idToFind = req.body.idToFind;

    if (cookieRefreshToken) {
        try {
            // verify refresh token against REFRESH_TOKEN_SECRET and extract user id from it
            const payload = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            // find user 
            const userId = payload.user._id
            User.findOne({ _id: userId })
                .then(user => {
                    if (user) {
                        let lesson = getLessonById(idToFind);
                        if (lesson) {
                            res.status(200).send({ lesson: lesson });
                        } else {
                            res.status(404).send({ message: "lesson not found..." });
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

module.exports = router;