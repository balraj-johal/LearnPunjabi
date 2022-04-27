/**
 * @module api/users
 */
 const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace groupRouter
 */
const router = express.Router();

// model imports
const User = require("../models/user.model");
const Group = require("../models/groups.model");

/**
 * Updates all the users' weeklyXP data in the group object
 * @name updateGroupsWeeklyXP
 * @param {Object} group
 * @returns {Object} group - with each user's XP updated from the database
 */
let updateGroupsWeeklyXP = async (group) => {
    for (user of group.users) {
        await User.findById(user._id)
            .then(foundUser => { user.weeklyXP = foundUser.weeklyXP; })
            .catch(err => { console.log(err); })
    }
    return group;
}

const GROUP_SIZE = 4;

/**
 * assigns all users in the database to a leaderboard group randomly
 * @name distributeUsers
 * @param {Array} groups - newly created group representations
 * @returns {Array} groups - groups with saved users
 */
 let distributeUsersToGroups = async (groups) => {
    // iterate through users
    for await (const user of User.find()) {
        let assigned = false;
        // attempt to assign to group
        while (!assigned) {
            // randomly select group
            let groupIndex = Math.floor(Math.random() * groups.length);
            let group = groups[groupIndex];
            // if group is not full, add user to group
            if (group.users.length < GROUP_SIZE) {
                group.users.push({
                    username: user.username,
                    _id: user._id,
                    weeklyXP: 0
                });
                assigned = true;
            }
        }
    }
    return groups;
}

/**
 * creates a serverside representation of the necessary amount of leaderboard groups
 * @name createNewServerGroups
 * @returns {Promise} 
 */
let createNewServerGroups = () => {
    return new Promise((resolve, reject) => {
        let groups = [];
        // calculate number of groups required
        User.count({})
            .then(count => {
                let noOfGroups = Math.ceil(count / 4);
                if (noOfGroups < 1) reject();
                // create required groups
                for (let counter = 0; counter < noOfGroups; counter++) {
                    groups[counter] = {
                        users: [],
                        groupID: counter,
                    }
                }
                resolve(distributeUsersToGroups(groups));
            })
    })
};

/**
 * Saves the serverside representation of the new leaderboard groups to the database
 * @name pushGroupsToDb
 * @param {Array} groups - serverside representation of groups
 */
let pushGroupsToDb = (groups) => {
    groups.forEach(updateData => {
        Group.findOne({ groupID : { $eq: updateData.groupID } })
            .then(DbGroup => {
                // if group doesn't exist yet, create and save group
                if (!DbGroup) {
                    let newGroup = new Group({
                        users: updateData.users,
                        groupID: updateData.groupID,
                    })
                    newGroup.save()
                        .then(saved => { console.log("group saved"); })
                        .catch(err => { console.log("save failed: ", err); })
                } else {
                    // if group already exists, update and save properties
                    DbGroup.users = updateData.users;
                    DbGroup.save()
                        .then(saved => { console.log("group saved"); })
                        .catch(err => { console.log("save failed: ", err); })
                }
                // update associated users linking them to new groups
                updateData.users.forEach(elem => {
                    User.findOne({ _id: {$eq: elem._id} })
                        .then(user => {
                            user.groupID = updateData.groupID;
                            user.weeklyXP = 0;
                            user.save()
                                .then(saved => { console.log("user saved"); })
                                .catch(err => { console.log("save failed: ", err); })
                        })
                });
            })
    })
}

// update leaderboard groups
createNewServerGroups()
    .then(groups => { pushGroupsToDb(groups) })

/**
 * Returns the username and weeklyXP for every user in the specified group.
 * @name get/groups/:groupID
 * @function
 * @memberof module:api/groups~groupRouter
 * @param { String } path - route path
 * @param { callback } middleware - express middleware
 */
 router.get("/:groupID", (req, res) => {
    const g_id = req.params.groupID;
    Group.findOne({ groupID : { $eq: g_id } })
        .then(group => {
            updateGroupsWeeklyXP(group)
                .then(result => {
                    return res.status(200).send({ group: result });
                })
        })
        .catch(err => {
            return res.status(404).send("Group not found...");
        })
})

module.exports = router;