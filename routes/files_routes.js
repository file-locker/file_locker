'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/File');
var passport = require('passport');
var bearerStrategy = require('passport-http-bearer').Strategy;
var handleError = require(__dirname + '/../lib/handle_error');

var download = require(__dirname + '/../lib/download');
var upload = require(__dirname + '/../lib/upload');
var userFiles = require(__dirname + '/../lib/user_files');
var updateFile = require(__dirname + '/../lib/update_file');
var removeFile = require(__dirname + '/../lib/remove_file');
var dataStats = require(__dirname + '/../lib/data_stats');

passport.use(new bearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user, {scope: 'all'});
    });
  }
));

var filesRoute = module.exports = exports = express.Router();

filesRoute.all('/user/*', function(req, res, next) {
  passport.authenticate('bearer', function(err, user) {
    if (err) throw err; //change to proper error handling
    if (!user) throw err; //same as above
  })(req, res, next);
});

filesRoute.get('/user/download/:id', function(req, res) {
  download(req, res);
});

filesRoute.post('/user/upload', function(req, res) {
  upload(req, res);
});

filesRoute.get('/user/userFiles', function(req, res) {
  //get a list of all files for username
  userFiles(req, res);
});

filesRoute.patch('/user/updateFile/:id', function(req, res) {
  //patch an existing meta data file
  //body will also contain id
  updateFile(req, res);
});

filesRoute.delete('/user/removeFile/:id', function(req, res) {
  removeFile(req, res);
});

filesRoute.get('/user/dataStats', function(req, res) {
  //return stats for entire file collection
  dataStats(req, res);
});
