const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const galleryRoutes = require('./routes/galleryRoutes');
const secretRoutes = require('./routes/secretRoutes');
const methodOverride = require('method-override');
var db = require('./models');
var PhotoModel = require('./models').photo;

const path = require('path');
const bodyparser = require('body-parser');
const CONFIG = require('./config/config.json');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(session({
  secret: CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

const authenticate = (username, password) => {
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;
  return ( username === USERNAME && password === PASSWORD );
};

passport.use(new LocalStrategy((username, password, done) => {
  console.log('username, password: ', username, password);
  if(authenticate(username, password)) {
    const user = {
      name: 'Joe',
      role: 'admin',
      favColor: 'green',
      isAdmin: true,
    };
    return done(null, user);
  }
  return done(null, false);
}));

app.use(express.static('./public'));

app.get('/login', (req, res) => {
  res.render('./login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}));

app.use('/secret', secretRoutes);

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use('/gallery', galleryRoutes);

app.get('/', (req, res) => {
  PhotoModel.findAll()
    .then((photos) => {
      res.render(`index`, {photos});
    });
});

app.listen(3000, _ => db.sequelize.sync());

module.exports = app;