require("dotenv").config();

const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Upload } = require("@aws-sdk/lib-storage");
const sanitize = require("sanitize-filename");

const REGION = "eu-west-2";
const s3Client = new S3Client({ region: REGION });

/** Gets presigned link to S3 file
 * @name getFileLink
 * @param {String} filename - relative path of object to fetch from bucket
 * @returns {Promise}
 */
function getFileLink(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            const BUCKET_PARAMS = {
                Bucket: "balraj-portfolio-bucket",
                Key: `${filename}`,
                Body: "BODY"
            }
            const getCommand = new GetObjectCommand(BUCKET_PARAMS);
            const signedURL = await getSignedUrl(s3Client, getCommand, 
                { expiresIn: 10 * 60 * 1000 } );
            resolve(signedURL);
        } catch(error) {
            reject(error);
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
            Body: fs.createReadStream(sanitize(file.filepath)) 
        };
        try {
            const parallelUploads3 = new Upload({
                client: s3Client,
                // tags: [...], // optional tags
                queueSize: 4, // optional concurrency configuration
                leavePartsOnError: false, // optional manually handle dropped parts
                params: target,
            });
            // parallelUploads3.on("httpUploadProgress", (progress) => {
            //     console.log("uploading: ", progress);
            // });
            await parallelUploads3.done();
            res.json({ files });
        } catch (error) {
            console.log(error);
        }
    })
});


module.exports = {router, getFileLink};