"use strict";

var User = require(__dirname + '/models/user');
var handleError = require(__dirname + '/lib/handle_error');
var EventEmitter = require('events').EventEmitter;
var response = require(__dirname + '/lib/response_handler');
var ee = new EventEmitter();

module.exports = exports = function () {
    var newUserData = new User(req.user);
    newUserData.generateHash(req.body.password, function(err, hash) {
        if (err) return handleError.err500(err, res);
        if (hash === req.user.password) {
            newUserData.password = hash;
            ee.emit('saveNewHash', req, res, newUserData);
        } else {
            return handleError.err401('Password incorrect', res);
        }
    });
};

ee.on('saveNewHash', function (req, res, newUser) {
    newUser.save(function (err) {
        if (err) return handleError.err500(err, res);
        return response.send200(res, 'Password changed');
    });
});

