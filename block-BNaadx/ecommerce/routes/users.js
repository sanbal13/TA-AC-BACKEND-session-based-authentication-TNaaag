/* eslint-disable no-unused-vars */
const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* GET users listing. */
router.get('/login', (_req, res, _next) => {
  res.render('login');
});
router.post('/login', (_req, res, _next) => {
  res.render('login');
});
router.get('/register', (_req, res, _next) => {
  res.render('register');
});
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    // eslint-disable-next-line no-console
    console.log(user);
    return res.redirect('login');
  });
});

module.exports = router;
