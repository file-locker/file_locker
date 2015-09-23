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
    User.findOne({ token: token }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  }
));

filesRoute.get('/download/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  download(req, res);
});

filesRoute.post('/upload', passport.authenticate('bearer', { session: false }), jsonParser, function(req, res) {
  upload(req, res);
});

filesRoute.get('/userFiles', passport.authenticate('bearer', { session: false }), function(req, res) {
  userFiles(req, res);
});

filesRoute.patch('/updateFile/:id', passport.authenticate('bearer', { session: false }), jsonParser, function(req, res) {
  updateFile(req, res);
});

filesRoute.delete('/user/removeFile/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  removeFile(req, res);
});

filesRoute.get('/dataStats', passport.authenticate('bearer', { session: false }), function(req, res) {
  dataStats(req, res);
});

filesRoute.get('/signout', passport.authenticate('bearer', { session: false }), function(req, res) {
  if (!req.user) res.json('sign out failed');
  req.token = '';
  req.save(function(err, data) {
    if (err) throw err;
    res.json({ msg: 'sign out successful' });
  });
});




