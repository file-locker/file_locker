'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var basicAuth = require(__dirname + '/../lib/basic_auth');
var bearerAuth = require(__dirname + '/../lib/bearer_auth');
var handleError = require(__dirname + '/../lib/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var usersRoute = module.exports = exports = express.Router();
usersRoute.use(passport.initialize());

usersRoute.post('/signup', jsonParser, function(req, res) {
  if ((!req.body.invitationCode) || req.body.invitationCode !== process.env.INVITATION_CODE) return handleError.err401(null, res);
  ee.emit('newUser', req, res);
});

ee.on('newUser', function(req, res) {
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


usersRoute.get('/signin', basicAuth.basicAuthentication, function(req, res) {
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


usersRoute.get('/signout', bearerAuth.bearerAuthentication, function(req, res) {
  if (!req.user) res.json({ msg: 'sign out failed' });
  req.user.token = '';
  req.user.save(function(err, data) {
    if (err) throw err;
    res.json({ msg: 'sign out successful' });
  });
});

