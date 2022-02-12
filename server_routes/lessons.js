const express = require("express");
const router = express.Router();

const { 
    verifyToken,
} = require("../authentication")

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

/**
 * @param  { String } id - lesson id
 * @returns { Object } result - lesson data object with id: id
 */
let getLessonById = (id) => {
    console.log("Looking for ", id)
    let result = LESSONS.find(lesson => lesson.id === id);
    return result;
}

router.post("/get-by-id", (req, res) => {
    verifyToken(req)
        .then(user => {
            let idToFind = req.body.idToFind;
            let lesson = getLessonById(idToFind);
            if (lesson) {
                res.status(200).send({ lesson: lesson });
            } else {
                res.status(404).send({ message: "lesson not found..." });
            }
        })
        .catch(err => {
            return res.status(500).send(err);
        })
})

module.exports = router;