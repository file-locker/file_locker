'use strict';

var User = require(__dirname + '/../models/user');
var passport = require('passport');
var bearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new bearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  }
));

exports.bearerAuthentication = passport.authenticate('bearer', { session: false });
