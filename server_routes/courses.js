/**
 * @module api/courses
 */
const express = require("express");
const sanitize = require("mongo-sanitize");
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace coursesRouter
 */
const router = express.Router();

const { verifyToken } = require("../utilities/authentication");
const { getFileLink } = require("./s3");

const Course = require("../models/course.model");

// /**
//  * Get overview of all courses
//  * @name get/
//  * @function
//  * @memberof module:api/courses~coursesRouter
//  * @param { String } path - route path
//  * @param { callback } middleware - express middleware
//  */
// router.get("/", async (req, res, next) => {
//     try {
//         await verifyToken(req);
//         const overview = await buildOverviewObject();
//         if (overview) return res.status(200).send({ overview: overview });
//         return res.status(404).send({ message: "overview data not found..." });
//     } catch (error) {
//         next(error);
//     }
// })

// /**
//  * Get latest course data
//  * @function
//  * @memberof module:api/courses~coursesRouter
//  * @param { String } path - route path
//  * @param { callback } middleware - express middleware
//  */
router.get("/", async (req, res) => {
    try {
        await verifyToken(req);
        const latestCourse = await getLatestCourse();
        if (!latestCourse) return res.status(500).send({
            message: "no course found."
        });
        console.log("sending", latestCourse);
        return res.status(200).send(latestCourse);
    } catch (err) {
        return res.status(500).send({error: err});
    }
})
// /**
//  * Get course data by courseID
//  * @function
//  * @memberof module:api/courses~coursesRouter
//  * @param { String } path - route path
//  * @param { callback } middleware - express middleware
//  */
router.get("/:version", async (req, res, next) => {
    try {
        await verifyToken(req);
        const course_PARAMS = { id: { $eq: sanitize(req.params.courseID) } };
        let course = await course.findOne(course_PARAMS);
        if (!course) return res.status(404).send("course not found.");
        let modifiedcourse = {...course._doc};
        for (let i = 0; i < modifiedcourse.tasks.length; i++) {
            const task = modifiedcourse.tasks[i]
            if (task.audioFilename) {
                let audioLink = await getFileLink(task.audioFilename);
                task.audioLink = audioLink;
            }
        }
        return res.status(200).send(modifiedcourse);
    } catch (err) {
        // next(err);
        return res.status(500).send({error: err});
    }
})

let getLatestCourse = async () => {
    const latestCourse = await Course.find().sort({ _id: -1 }).limit(1);
    if (latestCourse.length < 1) return;
    return latestCourse[0];
}
let getNewVersion = async () => {
    const latestCourse = await Course.find().sort({ _id: -1 }).limit(1);
    if (latestCourse.length < 1) return 1;
    return latestCourse[0].version + 1;
}

// /**
//  * Create/update course by courseID
//  * -- ONLY ADMIN ACCESSIBLE
//  * @function
//  * @memberof module:api/courses~coursesRouter
//  * @param { String } path - route path
//  * @param { callback } middleware - express middleware
//  */
router.post("/", async (req, res) => {
    try {
        console.log("attempting")
        const user = await verifyToken(req);
        if (user.role !== "Admin") return res.status(401).send("Unauthorised.");
        const newCourse = new Course();
        newCourse.lessons = req.body.courseData;
        newCourse.version = await getNewVersion();
        newCourse.save()
            .then(saved => { 
                return res.status(200).send({
                    savedCourse: saved,
                    message: "Save successful."
                });
            })
            .catch(err => { 
                console.log("saving error", err)
                return res.status(500).send({
                    error: err, 
                    message: "error saving course"
                }); 
            })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err })
    }
})

module.exports = router;