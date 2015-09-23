'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
var handleError = require(__dirname + '/../lib/handle_error');

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
  if (!req.body.invitationCode) handleError.err401(null, res);
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) handleError.err500(err, res);
    newUser.generateToken(function(err, token) {
      if (err) handleError.err500(err, res);
      newUser.token = token;
      newUser.save(function(err, data) {
        if (err) handleError.err500(err, res);
        res.json({ user: data });
      });
    });
  });
});

usersRoute.get('/signin', passport.authenticate('basic', { session: false }), function(req, res) {
  req.user.generateToken(function(err, token) {
    if (err) handleError.err500(err, res);
    req.user.save(function(err, data) {
      if (err) throw err;
      data.token = token;
      res.json({ user: data });
    });
  });
});
