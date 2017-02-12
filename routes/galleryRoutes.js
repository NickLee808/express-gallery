const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const galleryModel = require('../db/gallery');

router.get('/gallery/:id', (req, res) => {
  galleryModel.getPhotoById(req.params.id)
    .then(photos => {
      console.log(photos);
    });
});

module.exports = router;