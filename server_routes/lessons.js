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
const { getFileLink } = require("./s3");

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
            strId: lesson.strId,
            requiredCompletions: lesson.requiredCompletions,
            tasksLength: lesson.tasks.length
        })
    }
    return overview;
}
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
            buildOverviewObject()
                .then(overview => {
                    if (overview) return res.status(200).send({ overview: overview });
                    return res.status(404).send({ message: "overview data not found..." });
                })
            })
            .catch(err => { return res.status(500).send( {error: err}); })
})

/**
 * Get lesson data by lessonID
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.get("/:lessonID", async (req, res, next) => {
    try {
        await verifyToken(req);
        const LESSON_PARAMS = { strId: { $eq: req.params.lessonID } };
        let lesson = await Lesson.findOne(LESSON_PARAMS);
        if (!lesson) return res.status(404).send("Lesson not found.");
        let modifiedLesson = {...lesson._doc};
        for (let i = 0; i < modifiedLesson.tasks.length; i++) {
            const task = modifiedLesson.tasks[i]
            if (task.audioFilename) {
                let audioLink = await getFileLink(task.audioFilename);
                task.audioLink = audioLink;
            }
        }
        return res.status(200).send(modifiedLesson);
    } catch (err) {
        next(err);
    }
})

/**
 * Create/update lesson by lessonID
 * -- ONLY ADMIN ACCESSIBLE
 * @function
 * @memberof module:api/lessons~lessonsRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
router.post("/:lessonID", async (req, res) => {
    try {
        const user = await verifyToken(req);
        if (user.role !== "Admin") return res.status(401).send("Unauthorised.")
        let lesson = await Lesson.findOne({ strId: { $eq: req.params.lessonID } })
        if (!lesson) lesson = new Lesson()
        lesson.name = req.body.name;
        lesson.strId = req.body.strId;
        lesson.requiredCompletions = req.body.requiredCompletions;
        lesson.shuffle = req.body.shuffle;
        lesson.noToSample = req.body.noToSample;
        lesson.showInterstitials = req.body.showInterstitials;
        lesson.showPercentCorrect = req.body.showPercentCorrect;
        lesson.tasks = req.body.tasks;
        lesson.save()
            .then(saved => { return res.status(200).send({
                savedLesson : saved,
                message: "Save successful."
            }); })
            .catch(err => { return res.status(500).send("Error saving lesson: " + err); })
    } catch (err) {
        // TODO: correct response codes
        return res.status(500).send({ error: err })
    }
})

module.exports = router;