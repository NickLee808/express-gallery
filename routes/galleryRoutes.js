const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var PhotoModel = require('./../models').photo;

router.route('/new')
  .get((req, res) => {
    res.render(`newForm`);
  });

router.route('/:id')
  .get((req, res) => {
    PhotoModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(photo => {
        return photo.get({
          plain: true
        });
      })
       .then((photo) => {
        console.log(photo);
         res.render(`details`, {photo});
       });
  })
  .put((req, res) => {
    PhotoModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((photo) => {
        photo.update({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        });
      });
  })
  .delete((req, res) => {
    PhotoModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((photo) => {
        photo.destroy();
        res.render(`index`, {photo});
      });
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
    PhotoModel.findOne({
      where: {
        id : req.params.id
      }
    })
      .then((photo) => {
        res.render('editForm');
      });
  });

module.exports = router;