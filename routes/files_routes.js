'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var bearerAuth = require(__dirname + '/../lib/bearer_auth');
var handleError = require(__dirname + '/../lib/handle_error');

var filesRoute = module.exports = exports = express.Router();
filesRoute.use(passport.initialize());

filesRoute.get('/files/:id', bearerAuth.bearerAuthentication, function(req, res) {
  require(__dirname + '/../lib/download')(req, res);
});

filesRoute.post('/files', bearerAuth.bearerAuthentication, jsonParser, function(req, res) {
  require(__dirname + '/../lib/upload')(req, res);
});

filesRoute.patch('/files/:id', bearerAuth.bearerAuthentication, jsonParser, function(req, res) {
  require(__dirname + '/../lib/update_file')(req, res);
});

filesRoute.delete('/files/:id', bearerAuth.bearerAuthentication, function(req, res) {
  require(__dirname + '/../lib/remove_file')(req, res);
});

filesRoute.get('/userFiles', bearerAuth.bearerAuthentication, function(req, res) {
  require(__dirname + '/../lib/user_files')(req, res);
});

filesRoute.get('/dataStats', function(req, res) {
  require(__dirname + '/../lib/data_stats')(req, res);
});
