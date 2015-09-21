'use strict';

var handleError = require(__dirname + '/./handle_error');
var File = require(__dirname + '/../models/file');
var responseHandler = require(__dirname + '/../models/response_handler');

module.exports = function(req, res) {
  File.findOne({_id: req.params.id}, function(err, file) {
    if (err) handleError.err500(err, res);
    return responseHandler.send200(res, file);
  });
};
