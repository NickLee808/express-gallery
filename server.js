const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const app = express();
const galleryRoutes = require('./routes/galleryRoutes');

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

if(!module.parent){
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;