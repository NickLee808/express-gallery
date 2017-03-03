const express = require('express');
const router = express.Router();
var PhotoModel = require('./../models').photo;

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  }else{
    res.redirect('/login');
  }
}

router.route('/new').get(isAuthenticated, (req, res) => {
  res.render(`newForm`);
});

router.post('/test', (req, res) => {
  console.log('test case: ', req.body);
  res.end('hello');
});

router.route('/:id').get((req, res) => {
  res.locals.loggedIn = (req.user) ? (req.user.username): (false);
  PhotoModel.findOne({
    where: {
      id: req.params.id
    }
  }).then(photo => {
    return photo.get({
      plain: true
    });
  }).then((photo) => {
    res.render(`details`, {photo});
  });
}).put(isAuthenticated, (req, res) => {
  PhotoModel.findOne({
    where: {
      id: req.params.id
    }
  }).then((photo) => {
    photo.update({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }).then((photo) => {
      res.redirect(303, `/gallery/${photo.id}`);
    });
  });
}).delete(isAuthenticated, (req, res) => {
  PhotoModel.findOne({
    where: {
      id: req.params.id
    }
  }).then((photo) => {
    photo.destroy();
    PhotoModel.findAll().then((photos) => {
      res.render(`index`, {photos});
    });
  });
});

router.route('/').post(isAuthenticated, (req, res) => {
  PhotoModel.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }).then((photo) => {
    res.redirect(303, `/gallery/${photo.id}`);
  });
});

router.route('/:id/edit').get(isAuthenticated, (req, res) => {
  PhotoModel.findOne({
    where: {
      id : req.params.id
    }
  }).then(photo => {
    return photo.get({
      plain: true
    });
  }).then((photo) => {
    res.render('editForm', {photo});
  });
});

router.route('/:id/delete').get(isAuthenticated, (req, res) => {
  PhotoModel.findOne({
    where: {
      id: req.params.id
    }
  }).then((photo) => {
    res.render(`deleteForm`, {photo});
  });
});

module.exports = router;