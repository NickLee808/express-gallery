const express = require('express');
const bcrypt = require('bcrypt-nodejs');
var UserModel = require('./../models').user;
const router = express.Router();

router.get('/', (req, res) => {
  res.render('./register');
});

router.route('/').post((req, res) => {
  bcrypt.genSalt(5, (err, salt) => {
    bcrypt.hash(req.body.password, salt, null, (err, hash) => {
      UserModel.create({
        username: req.body.username,
        password: hash,
      }).then((user) => {
        res.render(`userProfile`);
      });
    });
  });
});

module.exports = router;