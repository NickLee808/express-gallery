const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var PhotoModel = require('./../models').photo;

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
        console.log('photo', photo);
        res.render(`details`, photo);
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
        console.log("req.body.link", req.body.link);
        res.redirect(303, `/gallery/${photo.id}`);
      });
  });

router.route('/new')
  .get((req, res) => {
    res.render('');
  });

router.route('/:id/edit')
  .get((req, res) => {
    res.render('');
  });

module.exports = router;