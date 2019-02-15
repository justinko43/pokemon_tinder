const express = require('express');
const upload = require('../services/s3service');

const singleUpload = upload.single('image');
const router = express.Router();

router.post('/upload', singleUpload, (req, res, next) => {
  try {
    return res.status(201).json({ location: req.file.location });
  } catch (err) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }
  }
});

module.exports = router;
