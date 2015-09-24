"use strict";

var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');
var EventEmitter = require('events').EventEmitter;
var response = require(__dirname + '/response_handler');
var ee = new EventEmitter();

module.exports = function (req, res) {
    var newUserData = new User(req.user);
    newUserData.generateHash(req.body.password, function(err, hash) {
        if (err) return handleError.err500(err, res);
        ee.emit('saveNewHash', req, res, newUserData);
    });
};

ee.on('saveNewHash', function (req, res, newUser) {
    User.findOneAndUpdate({_id: newUser._id}, newUser, function (err, data) {
        if (err) return handleError.err500(err, res);
        return response.send200(res, 'Password changed');
    });
});

