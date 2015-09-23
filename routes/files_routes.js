'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var bearerStrategy = require('passport-http-bearer').Strategy;
var handleError = require(__dirname + '/../lib/handle_error');


var download = require(__dirname + '/../lib/download');
var upload = require(__dirname + '/../lib/upload');
var userFiles = require(__dirname + '/../lib/user_files');
var updateFile = require(__dirname + '/../lib/update_file');
var removeFile = require(__dirname + '/../lib/remove_file');
var dataStats = require(__dirname + '/../lib/data_stats');

var filesRoute = module.exports = exports = express.Router();
filesRoute.use(passport.initialize());

passport.use(new bearerStrategy(
  function(token, done) {
    User.findOne({ 'basic.token': token }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  }
));


filesRoute.all('/user/*', function(req, res, next) {
  passport.authenticate('bearer', function(err, user) {
    if (err) throw err; //change to proper error handling
    if (!user) throw err; //same as above
  })(req, res, next);
});

filesRoute.get('/download/:id', function(req, res) {
  download(req, res);
});

filesRoute.post('/upload', jsonParser, function(req, res) {
  upload(req, res);
});

filesRoute.get('/userFiles', function(req, res) {
  userFiles(req, res);
});

filesRoute.patch('/updateFile/:id', jsonParser, function(req, res) {
  updateFile(req, res);
});

filesRoute.delete('/user/removeFile/:id', function(req, res) {
  removeFile(req, res);
});

filesRoute.get('/dataStats', function(req, res) {
  dataStats(req, res);
});
