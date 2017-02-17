const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }else{
    console.log('NOPE');
    res.redirect('/login');
  }
}

router.route('/')
  .get(isAuthenticated, (req, res) => {
    res.send('this is my secret page');
});

module.exports = router;