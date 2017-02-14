const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.route('/:id')
  .get((req, res) => {
    res.render('');
  })
  .put((req, res) => {

  });

module.exports = router;