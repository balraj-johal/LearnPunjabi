require("dotenv").config();

const express = require("express");
const router = express.Router();
// const multer = require("multer");
const AWS = require('aws-sdk');
let awsCloudFront  = require('aws-cloudfront-sign');
const { CloudFrontClient } = require('@aws-sdk/client-cloudfront');
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');
const formidable = require("formidable");
const fs = require("fs");
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

const REGION = "eu-west-2";
const s3Client = new S3Client({ region: REGION });

function getFileLink(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `https://d2hks59q0iv04y.cloudfront.net/${filename}`;
            getSignedUrl(
                url,
                process.env.CLOUDFRONT_ACCESS_KEY_ID_2,
                "2022-05-30",
                process.env.CLOUDFRONT_PK
            )
        } catch(error) {
            console.log("Signing error:", error);
        }
    });
}

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
                console.log("uploading: ", progress);
            });
        
            await parallelUploads3.done();
            res.json({ files });
        } catch (error) {
            console.log(error);
        }
    })
});


module.exports = {router, getFileLink};