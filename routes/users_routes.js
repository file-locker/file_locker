'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
var handleError = require(__dirname + '/../lib/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var usersRoute = module.exports = exports = express.Router();
usersRoute.use(passport.initialize());

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

usersRoute.post('/signup', jsonParser, function(req, res) {
  ee.emit('newUser', req, res);
});

ee.on('newUser', function(req, res) {
  if (!req.body.invitationCode || req.body.invitationCode !== process.env.INVITATION_CODE) handleError.err401(null, res);
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) throw err;
    ee.emit('signupToken', req, res, newUser);
  });
});

ee.on('signupToken', function(req, res, newUser) {
  newUser.generateToken(function(err, token) {
    if (err) throw err;
    newUser.token = token;
    ee.emit('saveNewUser', req, res, newUser);
  });
});

ee.on('saveNewUser', function(req, res, newUser) {
  newUser.save(function(err, data) {
    if (err) throw err;
    res.json({ user: data });
  });
});

usersRoute.get('/signin', passport.authenticate('basic', { session: false }), function(req, res) {
  ee.emit('signinToken', req, res);
});

ee.on('signinToken', function(req, res) {
  req.user.generateToken(function(err, token) {
    if (err) throw err;
    ee.emit('saveUser', req, res, token);
  });
});

ee.on('saveUser', function(req, res, token) {
  req.user.save(function(err, data) {
    if (err) throw err;
    data.token = token;
    res.json({ user: data });
  });
});

usersRoute.post('/changePassword', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
    require(__dirname + '/lib/change_password')(req, res);
});