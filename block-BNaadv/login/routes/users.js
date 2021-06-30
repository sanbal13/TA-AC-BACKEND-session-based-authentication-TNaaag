var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// register
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

// login
router.get('/login', (req, res) => {
  let error = req.flash('error')[0];
  res.render('login', { error });
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email is invalid');
      return res.redirect('/users/login');
    } else {
      user.verifyPassword(password, (err, result) => {
        if (err) return next(err);
        if (!result) {
          req.flash('error', 'Password is invalid');
          return res.redirect('/users/login');
        } else {
          req.session.userId = user.id;
          return res.render('dashboard', { user: user.name });
        }
      });
    }
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login');
});

module.exports = router;
