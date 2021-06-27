var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Register
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  let {email, password} = req.body;
  if(User.find({email}, (err, user) => {
      if(err) return next(err);
      if(user) {
        req.flash('error','Email already exists');
        return res.redirect('/users/register');
      }
  }))
  if(password.length < 4) {
    req.flash('error','password length must be atlest 4.');
    return res.redirect('/users/register');
  }

  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.redirect('login');
  });
});

// Login
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  let {email, password} = req.body;
  if(!email || !password) {
    req.flash('error', 'Email/password Required');
    return res.redirect('/users/login');
  }
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      req.flash('error', 'Email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if(!result) {
        req.flash('error', 'Password is wrong');
        return res.redirect('/users/login');
      } 
      req.session.userId = user.id;
      res.render('dashboard', {user: user.name});
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
