var db = require('./models');
var PhotoModel = require('./models').photo;
var UserModel = require('./models').user;
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const secretRoutes = require('./routes/secretRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const methodOverride = require('method-override');
const saltRounds = 10;
const path = require('path');
const bodyparser = require('body-parser');
const CONFIG = require('./config/config.json');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

//DO NOT MOVE OR CHANGE ORDER
app.use(express.static('./public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/secret', secretRoutes);
app.use('/gallery', galleryRoutes);
app.use(flash());
app.use(session({
  cookie: {maxAge: 60000},
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine);

function checkPassword(password){
  return bcrypt.compare(password, hash, (err, res) => {
    return res;
  });
}

const authenticate = (username, password) => {
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;
  return ( username === USERNAME && password === PASSWORD );
};

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  }else{
    res.redirect('/login');
  }
}

passport.use(new LocalStrategy((username, password, done) => {
  UserModel.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user === null) {
      console.log('user failed');
      return done(null, false, {message: 'bad username'});
    }else{
      bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
          return done(null, username);
        }else{
          return done(null, false, {message: 'bad password'});
        }
      });
    }
  }).catch(err => {
    console.log('error: ', err);
  });
}));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
  UserModel.findOne({
    where: {
      id: user.id
    }
  }).then (user => done(null, user));
});

passport.authenticate('local', {failureFlash: 'Invalid login'});

passport.authenticate('local', {successFlash: 'Welcome!'});

app.post('/user/new', (req, res) => {
  console.log('req.body.username: ', req.body.username);
  console.log('req.body.password: ', req.body.password);
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      console.log('hash', hash);
      UserModel.create({
        username: req.body.username,
        password: hash
      }).then(_ => {
        res.redirect('/login');
      });
    });
  });
});

app.get('/', (req, res) => {
  PhotoModel.findAll().then((photos) => {
    res.render(`index`, {photos});
  });
});

app.listen(3000, _ => db.sequelize.sync());

module.exports = app;