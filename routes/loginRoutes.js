const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

router.get('/', (req, res) => {
  res.render('./login');
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: './login',
  //failureFlash: true
}));

module.exports = router;