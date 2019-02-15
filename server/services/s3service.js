const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv').config();

console.log(process.env.ACCESS_KEY_ID);

AWS.config.update({
  secretAccessKey: process.env.ACCESS_KEY_SECRET,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-west-2',
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'pokemon1928',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
