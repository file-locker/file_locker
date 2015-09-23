'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;

var usersRoute = module.exports = exports = express.Router();
usersRoute.use(passport.initialize());

passport.use(new basicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.compareHash(password, function(err, hasRes) {
        if (err) return done(err);
        return done(null, user);
      });
    });
  }
));




usersRoute.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) throw err; //Change to proper err handler
    newUser.generateToken(function(err, token) {
      if (err) throw err;
      newUser.token = token;
      newUser.save(function(err, data) {
        if (err) throw err; //probably change this one as well
        res.json({ user: data });
      });
    });
  });
});

usersRoute.get('/signin', passport.authenticate('basic', { session: false }), function(req, res) {
  if (!req.user) res.status(403).end();
  req.user.generateToken(function(err, token) {
    if (err) throw err; //Stop being lazy and require in the error handler
    req.user.save(function(err, data) {
      if (err) throw err;
      data.token = token;
      res.json({ user: data });
    });
  });
});
