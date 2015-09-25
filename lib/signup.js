'use strict';

var handleError = require(__dirname + '/handle_error');
var User = require(__dirname + '/../models/user');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = function(req, res) {
  ee.emit('newUser', req, res);
};

ee.on('newUser', function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.err500(err, res);
    ee.emit('signupToken', req, res, newUser);
  });
});

ee.on('signupToken', function(req, res, newUser) {
  newUser.generateToken(function(err, token) {
    if (err) return handleError.err500(err, res);
    newUser.token = token;
    ee.emit('saveNewUser', req, res, newUser);
  });
});

ee.on('saveNewUser', function(req, res, newUser) {
  newUser.save(function(err, data) {
    var trimUser = {
      username: data.username,
      token: data.token,
      email: data.email
    };
    if (err) return handleError.err500(err, res);
    return res.json({ user: trimUser });
  });
});
