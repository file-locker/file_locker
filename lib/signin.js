'use strict';

var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = function(req, res) {
  if (!req.user) return handleError.err401(null, res);
  ee.emit('signinToken', req, res);
};

ee.on('signinToken', function(req, res) {
  req.user.generateToken(function(err, token) {
    if (err) return handleError.err500(err, res);
    ee.emit('saveUser', req, res, token);
  });
});

ee.on('saveUser', function(req, res, token) {
  req.user.save(function(err, data) {
    var trimUser = {
      username: data.username,
      token: data.token,
      email: data.email
    };
    if (err) handleError.err500(err, res);
    data.token = token;
    res.json({ user: trimUser });
  });
});
