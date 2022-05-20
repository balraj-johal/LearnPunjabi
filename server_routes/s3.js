require("dotenv").config();

const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const DOCUMENT = require("../models/document.model");
// let AWS = require("aws-sdk");
// let awsCloudFront  = require('aws-cloudfront-sign');
const formidable = require("formidable");
// const path = require("path");
const fs = require("fs");
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

const REGION = "eu-west-2";
const s3Client = new S3Client({ region: REGION });

// let storage = multer.memoryStorage();
// let upload = multer({ storage: storage });

// function asyncHandler(handler) {
//     return function (req, res, next) {
//         console.log("handler executed")
//         if (!handler) {
//             next(new Error(`Invalid handler ${handler}, it must be a function.`));
//         } else {
//             handler(req, res, next).catch(next);
//         }
//     };
// }
// function getFileLink(filename) {
//     return new Promise(function (resolve, reject) {
//         // let options = { keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID, privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH };
//         try {
//             let signedUrl = awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + "/" + filename, options);
//             resolve(signedUrl);
//         } catch {
//             console.log("error when signing")
//             console.log("testing acesskey id, ", process.env.CLOUDFRONT_ACCESS_KEY_ID)
//             console.log("testing paf, ", process.env.CLOUDFRONT_URL + "/" + filename)
//             reject();
//         }
//     });
// }
// async function download(req, res) {
//     console.log("filename:", req.query.filename);
//     let response = await getFileLink(req.query.filename);
//     res.send(response);
//     res.end();
// }


router.post("/upload", (req, res, next) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        let file = files.file;
        if (err) return next(err);
        const target = { 
            Bucket: 'balraj-portfolio-bucket', 
            Key: file.originalFilename, 
            Body: fs.createReadStream(file.filepath) 
        };
        try {
            const parallelUploads3 = new Upload({
                client: s3Client,
                // tags: [...], // optional tags
                queueSize: 4, // optional concurrency configuration
                leavePartsOnError: false, // optional manually handle dropped parts
                params: target,
            });
        
            parallelUploads3.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });
        
            await parallelUploads3.done();
            res.json({ files });
        } catch (error) {
            console.log(error);
        }
    })
});

// router.route("/get-image").get(asyncHandler(download));

module.exports = router;