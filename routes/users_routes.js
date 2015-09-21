'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var User = require(__dirname + '/../models/user');
//req passport

var usersRoute = module.exports = exports = express.Router();

usersRoute.post('/signup', function(req, res) {
  //post for creating a new user
});

usersRoute.get('/signin', function(req, res) {
  //get route for signing with via passport
});

