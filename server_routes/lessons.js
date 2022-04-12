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

const { verifyToken } = require("../utilities/authentication");

const LESSONS = [
    {
        name: "Intro to Punjabi",
        id: "Intro_Main",
        requiredCompletions: 1,
        shuffle: false,
        tasks: [
            {
                taskID: "1",
                text: `
                    Punjabi is a language spoken by over 112 million people.

                    It is written in an alpabet called Gurmukhi - which translated means
                    "from the mouth of the Guru", where Guru means sacred teacher.

                    Throughout this course you will learn how to read and write in the
                    Gurmukhi alphabet and also learn common Punjabi words and phrases.
                `,
                type: "TextOnly",
            },
        ]
    },
    {
        name: "Spec Order Test",
        id: "Spec_Order_Test",
        requiredCompletions: 1,
        shuffle: false,
        tasks: [
            {
                taskID: "7",
                text: "What sound does the character ੲ make?",
                type: "SpecifiedOrder",
                possibleAnswers: [
                    {
                        text: "3",
                        id: "a-0"
                    },
                    {
                        text: "2",
                        id: "a-1"
                    },
                    {
                        text: "1",
                        id: "a-2"
                    },
                ],
                correctAnswer: "123",
            },
            {
                taskID: "1",
                text: "What sound does the character ੲ make?",
                type: "SpecifiedOrder",
                possibleAnswers: [
                    {
                        text: "3",
                        id: "a-0"
                    },
                    {
                        text: "2",
                        id: "a-1"
                    },
                    {
                        text: "1",
                        id: "a-2"
                    },
                ],
                correctAnswer: "123",
            },
        ]
    },
    {
        name: "Intro to Line 1",
        id: "Intro_Line-1",
        requiredCompletions: 1,
        shuffle: false,
        tasks: [
            {
                taskID: "1",
                text: `
                    There are 35 Gurmukhi characters, that are commonly divided into
                    groups of 5.

                    This lesson will cover the first line.
                `,
                type: "TextOnly",
            },
            {
                taskID: "2",
                text: `
                    Ourha
                `,
                type: "TextOnly",
            },
            {
                taskID: "3",
                text: "What sound does the character ੳ make?",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        bottomText: "ai"
                    },
                    {
                        bottomText: "ee"
                    },
                    {
                        bottomText: "ou"
                    },
                ],
                correctAnswerIndex: 2,
            },
            {
                taskID: "4",
                text: `
                    Ai'rhaa
                    (ai - as in air) - makes the a sound
                `,
                type: "TextOnly",
            },
            {
                taskID: "5",
                text: "What sound does the character ਅ make?",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        bottomText: "ai"
                    },
                    {
                        bottomText: "ee"
                    },
                    {
                        bottomText: "ou"
                    },
                ],
                correctAnswerIndex: 0,
            },
            {
                taskID: "6",
                text: `
                    Ee'rhee	
                    (e - as in air) - makes the e sound
                `,
                type: "TextOnly",
            },
            {
                taskID: "7",
                text: "What sound does the character ੲ make?",
                type: "MultipleChoice",
                possibleAnswers: [
                    {
                        bottomText: "ai"
                    },
                    {
                        bottomText: "ee"
                    },
                    {
                        bottomText: "ou"
                    },
                ],
                correctAnswerIndex: 1,
            },
        ]
    },
    {
        name: "line 1",
        id: "1",
        requiredCompletions: 5,
        tasks: [
            {
                taskID: "1",
                text: 'Which character makes the "ou" sound?',
                type: "MultipleChoice",
                audioSrc: "test.mp3",
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
                text: "PLACEHOLDER2",
                type: "AI"
            },
            {
                taskID: "3",
                text: "PLACEHOLDER3",
                type: "MultipleChoice",
                audioSrc: "test.mp3",
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
                text: "PLACEHOLDERttt2",
                type: "AI"
            },
            {
                taskID: "3",
                text: "PLACEHOLDERttt3",
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
 * Get overview of all lessons
 * @name get/
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/", (req, res) => {
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
            if (overview) return res.status(200).send({ overview: overview });
            return res.status(404).send({ message: "overview data not found..." });
        })
        .catch(err => { return res.status(500).send({error: err}); })
})

/**
 * Get lesson data by lessonID
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/:lessonID", (req, res) => {
    verifyToken(req)
        .then(user => {
            let lesson = LESSONS.find(lesson => lesson.id === req.params.lessonID);
            if (lesson) {
                res.status(200).send({ lesson: lesson });
            } else {
                res.status(404).send({ message: "lesson not found..." });
            }
            return res.status(401).send({
                error: "User does not have correct role for this resource."
            });
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
})

module.exports = router;