'use strict';

var User = require(__dirname + '/../models/user');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

passport.use(new basicStrategy(function(username, password, done) {
  ee.emit('findUser', username, password, done);
}));

ee.on('findUser', function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    ee.emit('compareHash', password, user, done);
  });
});

ee.on('compareHash', function(password, user, done) {
  user.compareHash(password, function(err, hashRes) {
    if (err) return done(err);
    return done(null, user);
  });
});


exports.basicAuthentication = passport.authenticate('basic', { session: false });
