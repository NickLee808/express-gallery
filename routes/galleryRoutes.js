const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var PhotoModel = require('./../models').photo;

router.route('/new')
  .get((req, res) => {
    res.render(`form`);
  });

router.route('/:id')
  .get((req, res) => {
    PhotoModel.findOne({
      where: {
        id : req.params.id
      }
    })
      .then(photo => {
        return photo.get({
          plain: true
        });
      })
      .then((photo) => {
        res.render(`details`, {photo:photo});
      });
  })
  .put((req, res) => {
    res.render('');
  })
  .delete((req, res) => {
    res.redirect('');
  });

router.route('/')
  .post((req, res) => {
    PhotoModel.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
      .then((photo) => {
        res.redirect(303, `/gallery/${photo.id}`);
      });
  });

router.route('/:id/edit')
  .get((req, res) => {
    res.render('');
  });

module.exports = router;