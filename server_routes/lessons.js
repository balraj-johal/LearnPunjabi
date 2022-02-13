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
                text: "butt1",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        text: "Balraj"
                    },
                    {
                        text: "Not Balraj"
                    },
                    {
                        text: "Balraj the fourth"
                    },
                ],
                correctAnswerIndex: 0,
            },
            {
                id: "2",
                text: "butt2",
                type: "AI"
            },
            {
                id: "3",
                text: "butt3",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        text: "Balraj"
                    },
                    {
                        text: "Not Balraj"
                    },
                    {
                        text: "Balraj the fourth"
                    },
                ],
                correctAnswerIndex: 0,
            },
        ]
    },
    {
        name: "line 2",
        id: "2",
        tasks: [
            {
                id: "1",
                text: "what is my name",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        text: "Balraj"
                    },
                    {
                        text: "Not Balraj"
                    },
                    {
                        text: "Balraj the fourth"
                    },
                ],
                correctAnswerIndex: 0,
            },
            {
                id: "2",
                text: "buttttt2",
                type: "AI"
            },
            {
                id: "3",
                text: "buttttt3",
                type: "MultipleChoice"
            },
        ]
    },
    {
        name: "line 3",
        id: "3",
        tasks: [
            {
                id: "1",
                text: "bu3tt1",
                type: "MultipleChoice"
            },
            {
                id: "2",
                text: "but3ttt2",
                type: "AI"
            },
            {
                id: "3",
                text: "33",
                type: "MultipleChoice"
            },
        ]
    },
]

/**
 * @param  { String } id - lesson id
 * @returns { Object } result - lesson data object with id: id
 */
let getLessonById = (id) => {
    let result = LESSONS.find(lesson => lesson.id === id);
    return result;
}

router.post("/get-by-id/:lessonID", (req, res) => {
    verifyToken(req)
        .then(user => {
            let lesson = getLessonById(req.params.lessonID);
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