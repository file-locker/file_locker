'use strict';

var User = require(__dirname + '/../models/user');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = function(req, res) {
  ee.emit('signinToken', req, res);
};

ee.on('signinToken', function(req, res) {
  req.user.generateToken(function(err, token) {
    if (err) handleError.err500(err, res);
    ee.emit('saveUser', req, res, token);
  });
});

ee.on('saveUser', function(req, res, token) {
  req.user.save(function(err, data) {
    if (err) handleError.err500(err, res);
    data.token = token;
    res.json({ user: data });
  });
});
