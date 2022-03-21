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
} = require("../authentication");

const Lesson = require("../models/lesson.model");

/**
 * Asynchronously get overview data of all lessons
 * @name buildOverviewObject
 * @function
 * @returns {Array} overview
 */
let buildOverviewObject = async () => {
    let overview = [];
    for await (const lesson of Lesson.find()) {
        overview.push({
            name: lesson.name,
            id: lesson.strId,
            requiredCompletions: lesson.requiredCompletions
        })
    }
    return overview;
}
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
            buildOverviewObject()
                .then(overview => {
                    if (overview) {
                        res.status(200).send({ overview: overview });
                    } else {
                        res.status(404).send({ message: "overview data not found..." });
                    }
                })
        })
        .catch(err => {
            return res.status(500).send({error: err});
        })
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
            Lesson.findOne({ strId: { $eq: req.params.lessonID } })
                .then(lesson => {
                    if (lesson) {
                        return res.status(200).send(lesson);
                    } else {
                        return res.status(404).send("Lesson not found.");
                    }
                })
                .catch(err => { return res.status(500).send({error: err}); })
        })
        .catch(err => { return res.status(500).send({error: err}); })
})

/**
 * Create/update lesson by lessonID
 * -- ONLY ADMIN ACCESSIBLE
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/:lessonID", (req, res) => {
    verifyToken(req)
        .then(user => {
            if (user.role === "Admin") {
                Lesson.findOne({ strId: { $eq: req.params.lessonID } })
                    .then(lesson => {
                        if (!lesson) {
                            lesson = new Lesson({
                                name: req.body.name,
                                strId: req.body.strId,
                                requiredCompletions: req.body.requiredCompletions,
                                shuffle: req.body.shuffle,
                                tasks: req.body.tasks,
                            })
                        } else {
                            lesson.name = req.body.name;
                            lesson.strId = req.body.strId;
                            lesson.requiredCompletions = req.body.requiredCompletions;
                            lesson.shuffle = req.body.shuffle;
                            lesson.tasks = req.body.tasks;
                        }
                        lesson.save()
                            .then(saved => {
                                return res.status(200).send(saved);
                            })
                            .catch(err => {
                                return res.status(500).send("Error saving lesson: ", err);
                            })
                    })
                    .catch(err => { return res.status(500).send({error: err}); })
            } else {
                return res.status(401).send({
                    error: "User does not have correct role for this resource."
                });
            }
        })
})

module.exports = router;