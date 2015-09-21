'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/File');
//passport req

var filesRoute = module.exports = exports = express.Router();

filesRoute.get('/download/:id', function(req, res) {
  //download file
});

filesRoute.post('/upload', function(req, res) {
  //upload file
});

filesRoute.get('/allFiles', function(req, res) {
  //get a list of all files for username
});

filesRoute.patch('/updateFile/:id', function(req, res) {
  //patch an existing meta data file
  //body will also contain id
});

filesRoute.delete('/removeFile/:id', function(req, res) {
  //delete a specified file
});

filesRoute.get('/dataStats', function(req, res) {
  //return stats for entire file collection
});
