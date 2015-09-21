'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/File');
//passport req will go here

var download = require(__dirname + '/../lib/download');
var upload = require(__dirname + '/../lib/upload');
var userFiles = require(__dirname + '/../lib/user_files');
var updateFile = require(__dirname + '/../lib/update_file');
var removeFile = require(__dirname + '/../lib/remove_file');
var dataStats = require(__dirname + '/../lib/data_stats');

var filesRoute = module.exports = exports = express.Router();

//router points to modules that handle each function

filesRoute.get('/download/:id', function(req, res) {
  download(req, res);
});

filesRoute.post('/upload', function(req, res) {
  upload(req, res);
});

filesRoute.get('/userFiles', function(req, res) {
  //get a list of all files for username
  userFiles(req, res);
});

filesRoute.patch('/updateFile/:id', function(req, res) {
  //patch an existing meta data file
  //body will also contain id
  updateFile(req, res);
});

filesRoute.delete('/removeFile/:id', function(req, res) {
  removeFile(req, res);
});

filesRoute.get('/dataStats', function(req, res) {
  //return stats for entire file collection
  dataStats(req, res);
});
