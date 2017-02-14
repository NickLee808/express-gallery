const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./../models');
const {Photo} = db;

router.route('/:id')
  .get((req, res) => {
    res.render('');
  })
  .put((req, res) => {

  })
  .post((req, res) => {
    res.redirect();
  })
  .delete((req, res) => {
    res.redirect();
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