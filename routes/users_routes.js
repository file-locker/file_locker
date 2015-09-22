'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username}, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.compareHash(password, function(err, hasRes) {
        if (err) return done(err);
        return done(null, user);
      });
    });
  }
));

var usersRoute = module.exports = exports = express.Router();

usersRoute.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.basic.username = req.body.username;
  newUser.basic.email = req.body.email;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) throw err; //Change to proper err handler
    newUser.save(function(err, data) {
      if (err) throw err; //probably change this one as well
      res.json({msg: 'account created!'});
    });
  });
});

usersRoute.get('/signin', passport.authenticate('local'), function(req, res) {
  req.user.generateToken(function(err, token) {
    if (err) throw err; //Stop being lazy and require in the error handler
    req.user.token = token;
    res.json(req.user);
  })
});

