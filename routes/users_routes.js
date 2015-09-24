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
  if ((!req.body.invitationCode) || req.body.invitationCode !== process.env.INVITATION_CODE) return handleError.err(res, 403, 'Could not authenticate');
  require(__dirname + '/../lib/signup')(req, res);
});

usersRoute.get('/signin', basicAuth.basicAuthentication, function(req, res) {
  require(__dirname + '/../lib/signin')(req, res);
});

usersRoute.get('/signout', bearerAuth.bearerAuthentication, function(req, res) {
  require(__dirname + '/../lib/signout')(req, res);
});

usersRoute.post('/changePassword', jsonParser, bearerAuth.bearerAuthentication, function(req, res) {
    require(__dirname + '/lib/change_password')(req, res);
});
