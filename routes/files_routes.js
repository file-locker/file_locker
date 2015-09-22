'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
//passport req will go here

var download = require(__dirname + '/../lib/download');
var upload = require(__dirname + '/../lib/upload');
var userFiles = require(__dirname + '/../lib/user_files');
var updateFile = require(__dirname + '/../lib/update_file');
var removeFile = require(__dirname + '/../lib/remove_file');
var dataStats = require(__dirname + '/../lib/data_stats');

var filesRoute = module.exports = exports = express.Router();

filesRoute.get('/download/:id', function(req, res) {
  download(req, res);
});

filesRoute.post('/upload', jsonParser, function(req, res) {
  upload(req, res);
});

filesRoute.get('/userFiles', function(req, res) {
  userFiles(req, res);
});

filesRoute.patch('/updateFile/:id', function(req, res) {
  updateFile(req, res);
});

filesRoute.delete('/removeFile/:id', function(req, res) {
  removeFile(req, res);
});

filesRoute.get('/dataStats', function(req, res) {
  dataStats(req, res);
});
