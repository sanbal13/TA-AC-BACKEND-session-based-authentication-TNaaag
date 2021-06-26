var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('index');
});

// register
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return req.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/users/login');
    } else {
      user.verifyPassword(password, (err, result) => {
        if (err) return next(err);
        if (!result) {
          return res.redirect('/users/login');
        } else {
          req.session.userId = user.id;
          res.redirect('/users');
        }
      });
    }
  });
});

module.exports = router;
