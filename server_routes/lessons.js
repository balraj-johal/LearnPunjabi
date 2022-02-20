/**
 * @module api/lessons
 */
const express = require("express");
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace lessonsRouter
 */
const router = express.Router();

const { 
    verifyToken,
} = require("../authentication")

const LESSONS = [
    {
        name: "line 1",
        id: "1",
        requiredCompletions: 5,
        tasks: [
            {
                taskID: "1",
                text: 'Which character makes the "ou" sound?',
                type: "MultipleChoice",
                audioSrc: "test",
                possibleAnswers: [
                    {
                        // bottomText: "Balraj",
                        middleText: "ੳ"
                    },
                    {
                        // bottomText: "Not Balraj",
                        middleText: "ਅ"
                    },
                    {
                        // bottomText: "Balraj the fourth",
                        middleText: "ੲ"
                    },
                ],
                correctAnswerIndex: 0,
            },
            {
                taskID: "2",
                text: "butt2",
                type: "AI"
            },
            {
                taskID: "3",
                text: "butt3",
                type: "MultipleChoice",
                audioSrc: "test",
                possibleAnswers: [
                    {
                        bottomText: "Balraj",
                        middleText: ""
                    },
                    {
                        bottomText: "Not Balraj",
                        middleText: ""
                    },
                    {
                        bottomText: "Balraj the fourth",
                        middleText: ""
                    },
                ],
                correctAnswerIndex: 0,
            },
        ]
    },
    {
        name: "line 2",
        id: "2",
        requiredCompletions: 5,
        tasks: [
            {
                taskID: "1",
                text: "what is my name",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        bottomText: "Balraj"
                    },
                    {
                        bottomText: "Not Balraj"
                    },
                    {
                        bottomText: "Balraj the fourth"
                    },
                ],
                correctAnswerIndex: 0,
            },
            {
                taskID: "2",
                text: "buttttt2",
                type: "AI"
            },
            {
                taskID: "3",
                text: "buttttt3",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        bottomText: "Balraj"
                    },
                    {
                        bottomText: "Not Balraj"
                    },
                    {
                        bottomText: "Balraj the fourth"
                    },
                ],
                correctAnswerIndex: 0,
            },
        ]
    },
    {
        name: "line 3",
        id: "3",
        requiredCompletions: 5,
        tasks: [
            {
                taskID: "1",
                text: "bu3tt1",
                type: "MultipleChoice"
            },
            {
                taskID: "2",
                text: "but3ttt2",
                type: "AI"
            },
            {
                taskID: "3",
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

/**
 * Get lesson data by lessonID
 * @name get/get-by-id
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/get-by-id/:lessonID", (req, res) => {
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
            return res.status(500).send({error: err});
        })
})

/**
 * Get overview of all lessons
 * @name get/overview
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/overview", (req, res) => {
    verifyToken(req)
        .then(user => {
            let overview = [];
            LESSONS.forEach(elem => {
                overview.push({
                    name: elem.name,
                    id: elem.id,
                    requiredCompletions: elem.requiredCompletions
                })
            })
            if (overview) {
                res.status(200).send({ overview: overview });
            } else {
                res.status(404).send({ message: "overview data not found..." });
            }
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
})


module.exports = router;