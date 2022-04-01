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
} = require("../../authentication");


/** 
 * Update user proress by changing lesson status by lesson id
 * @param  {String} path "/:lessonID"
 */
router.put("/:lessonID", (req, res) => {
    const lessonID = req.params.lessonID;
    verifyToken(req)
        .then(user => {
            let lesson;
            // check if lesson object is already present
            user.progress.forEach(storedLesson => {
                if (storedLesson != null) {
                    if (storedLesson.id === lessonID) {
                        lesson = storedLesson;
                        // update lesson object
                        storedLesson.timesCompleted = storedLesson.timesCompleted + 1;
                    }
                }
            })
            // if lesson not previously tracked begin tracking progress
            if (lesson === undefined) {
                user.progress.push({ id: lessonID, timesCompleted: 1 });
            }
            // notify mongoose that progress property has changed
            user.markModified("progress");
            
            // update user XP trackers
            user.weeklyXP = Number(user.weeklyXP) + Number(req.body.XP);
            try {
                user.totalXP = Number(user.totalXP) + Number(req.body.XP);
            } catch {
                user.totalXP = 0;
            }

            // save user
            user.save()
                .then(savedUser => {
                    return res.status(200).send({ 
                        newProgress: savedUser.progress,
                        savedUser: savedUser // TODO: remove safely 
                    }); 
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({ error: err });
                })
        }) 
        .catch(err => {
            console.log("err, ", err);
            return res.status(500).send({ error: err });
        })

})

module.exports = router;