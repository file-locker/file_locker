'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
//passport req will go here

var filesRoute = module.exports = exports = express.Router();

filesRoute.get('/files/:id', function(req, res) {
  var download = require(__dirname + '/../lib/download');
  download(req, res);
});

filesRoute.post('/files', jsonParser, function(req, res) {
  var upload = require(__dirname + '/../lib/upload');
  upload(req, res);
});

filesRoute.patch('/files/:id', jsonParser, function(req, res) {
  var updateFile = require(__dirname + '/../lib/update_file');
  updateFile(req, res);
});

filesRoute.delete('/files/:id', function(req, res) {
  var removeFile = require(__dirname + '/../lib/remove_file');
  removeFile(req, res);
});

filesRoute.get('/userFiles', function(req, res) {
  var userFiles = require(__dirname + '/../lib/user_files');
  userFiles(req, res);
});

filesRoute.get('/dataStats', function(req, res) {
  var dataStats = require(__dirname + '/../lib/data_stats');
  dataStats(req, res);
});
