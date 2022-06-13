/**
 * @module api/users/progress
 */
const express = require("express");
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace progressRouter
 */
const router = express.Router();

const { 
    verifyToken,
} = require("../../utilities/authentication");


const DAY_IN_MS = 24 * 60 * 60 * 1000;
/** 
 * Update user proress by changing lesson status by lesson id
 * @param  {String} path "/:lessonID"
 */
router.put("/:lessonID", async (req, res) => {
    try {
        let user = await verifyToken(req);
        const lessonID = req.params.lessonID;
        let lesson;
        // check if lesson object is already present
        user.progress.forEach(storedLesson => {
            if (storedLesson === null) return;
            if (storedLesson.id !== lessonID) return;
            lesson = storedLesson;
            storedLesson.timesCompleted = storedLesson.timesCompleted + 1;
        })
        // if lesson not previously tracked begin tracking progress
        if (lesson === undefined) user.progress.push({
            id: lessonID, 
            timesCompleted: 1 
        });
        // notify mongoose that progress property has changed
        user.markModified("progress");
        // update user XP
        await _updateXP(user, req.body.XP);
        // update streak if required
        let today = new Date;
        today.setUTCHours(0,0,0,0);
        if (!user.lastLessonFinish) {
            user.streak += 1;
            user.lastLessonFinish = today;
        }
        if (user.lastLessonFinish + DAY_IN_MS < today.getTime()) {
            user.streak += 1;
        }
        user.lastLessonFinish = today;
        // save user
        let savedUser = await user.save();
        return res.status(200).send({ newProgress: savedUser.progress });
    } catch (error) { return res.status(500).send({ error: error }); }
})

/** Updates both a users weekly and total XP
 * @name _updateXP
 * @param {Object} user - user whose XP to increase
 * @param {Number} amount - amount to increase their XP by
 */
let _updateXP = (user, amount) => {
    return new Promise((resolve, reject) => {
        user.weeklyXP = Number(user.weeklyXP) + Number(amount);
        user.totalXP = Number(user.totalXP) + Number(amount);
        // if XP data is invalid, reset to 0
        if (isNaN(user.weeklyXP) || !isFinite(user.weeklyXP)) user.weeklyXP = 0;
        if (isNaN(user.totalXP) || !isFinite(user.totalXP)) user.totalXP = 0;
        resolve(true);
    })
}

module.exports = router;