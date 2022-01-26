
require("dotenv").config();

const express = require("express");
const router = express.Router();
const DOCUMENT = require("../models/document.model");
const multer = require("multer");
let AWS = require("aws-sdk");
let awsCloudFront  = require('aws-cloudfront-sign');

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

function asyncHandler(handler) {
    return function (req, res, next) {
        console.log("handler executed")
        if (!handler) {
            next(new Error(`Invalid handler ${handler}, it must be a function.`));
        } else {
            handler(req, res, next).catch(next);
        }
    };
}
function getFileLink(filename) {
    return new Promise(function (resolve, reject) {
        // let options = { keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID, privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH };
        let options = { keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID, privateKeyPath: "./pk-APKAIKG634PZRWJXJHIQ.pem" };
        try {
            let signedUrl = awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + "/" + filename, options);
            resolve(signedUrl);
        } catch {
            console.log("error when signing")
            console.log("testing acesskey id, ", process.env.CLOUDFRONT_ACCESS_KEY_ID)
            console.log("testing paf, ", process.env.CLOUDFRONT_URL + "/" + filename)
            reject();
        }
    });
}
async function download(req, res) {
    console.log("WWWWW")
    console.log("filename:",req.query.filename);
    let response = await getFileLink(req.query.filename);
    res.send(response);
    res.end();
}

// get all?
router.route("/").get((req, res, next) => {
    DOCUMENT.find({}, null, { sort: { createdAt: 1 } }, (err, docs) => { // find all of type
            if (err) {
                return next(err);
            }
            res.status(200).send(docs); // return all found documents
        }
    );
});

router.route("/get-image").get(asyncHandler(download));
// router.route("/getimg").get((req, res) => {
//     console.log("this works, ", req.query.filename)
// });

module.exports = router;