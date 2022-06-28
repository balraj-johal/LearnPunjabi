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
        const QUERY = { version: { $eq: process.env.PUBLIC_COURSE_VERSION } };
        let course = await Course.findOne(QUERY);
        if (!course) return res.status(404).send("course not found.");
        return res.status(200).send(course);
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
    console.log("getting course:", req.params.version)
    try {
        await verifyToken(req);
        const QUERY = { version: { $eq: sanitize(req.params.version) } };
        let course = await Course.findOne(QUERY);
        if (!course) return res.status(404).send("course not found.");
        return res.status(200).send(course);
    } catch (err) {
        // next(err);
        console.log(err)
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