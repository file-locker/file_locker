'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

module.exports = function(req, res) {
  Metadata.find({createdBy: req.auth.user}, 'name', function(err, files) {
    if (err) return handleError.err404(err, res);
    var usersFiles = files.toString();
    responseHandler.send200(res, usersFiles);
  });
};
