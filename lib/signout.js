'use strict';

var User = require(__dirname + '/../models/user');

module.exports = function(req, res) {
    if (!req.user) return res.json({ msg: 'sign out failed' });
  req.user.token = '';
  req.user.save(function(err, data) {
    if (err) handleError.err500(err, res);
    return res.json({ msg: 'sign out successful' });
  });
};

