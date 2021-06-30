var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Register
router.get('/register', (req, res, next) => {
  let error = req.flash('error')[0];
  res.render('register', { error });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      if (err.name === 'MongoError') {
        req.flash('error', 'This email is taken');
        return res.redirect('/users/register');
      }
      if (err.errors.password.name === 'ValidatorError') {
        req.flash('error', 'Password should be atleast 4 characters long');
        return res.redirect('/users/register');
      }
      return res.json({ err });
    }
    res.redirect('/users/login');
  });
});

// Login
router.get('/login', (req, res, next) => {
  let error = req.flash('error')[0];
  console.log(req.session);
  res.render('login', { error });
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/password Required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Password is wrong');
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      console.log(req.session);
      res.render('dashboard', { user: user.name });
    });
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.session.destroy;
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
