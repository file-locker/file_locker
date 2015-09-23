'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var bearerStrategy = require('passport-http-bearer').Strategy;
var handleError = require(__dirname + '/../lib/handle_error');

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

filesRoute.get('/files/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  var download = require(__dirname + '/../lib/download');
  download(req, res);
});

filesRoute.post('/files', passport.authenticate('bearer', { session: false }), jsonParser, function(req, res) {
  var upload = require(__dirname + '/../lib/upload');
  upload(req, res);
});

filesRoute.patch('/files/:id', passport.authenticate('bearer', { session: false }), jsonParser, function(req, res) {
  var updateFile = require(__dirname + '/../lib/update_file');
  updateFile(req, res);
});

filesRoute.delete('/files/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  var removeFile = require(__dirname + '/../lib/remove_file');
  removeFile(req, res);
});

filesRoute.get('/userFiles', passport.authenticate('bearer', { session: false }), function(req, res) {
  var userFiles = require(__dirname + '/../lib/user_files');
  userFiles(req, res);
});

filesRoute.get('/dataStats', passport.authenticate('bearer', { session: false }), function(req, res) {
  var dataStats = require(__dirname + '/../lib/data_stats');
  dataStats(req, res);
});

filesRoute.get('/signout', passport.authenticate('bearer', { session: false }), function(req, res) {
  if (!req.user) res.json({ msg: 'sign out failed' });
  req.token = '';
  req.user.save(function(err, data) {
    if (err) throw err;
    res.json({ msg: 'sign out successful' });
  });
});




