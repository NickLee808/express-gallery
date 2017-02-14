const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const galleryRoutes = require('./routes/galleryRoutes');

var db = require('./models');
var Photo = db.Photo;

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, _ => db.sequelize.sync());

module.exports = app;