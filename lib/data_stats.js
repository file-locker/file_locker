'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

module.exports = function(req, res) {
  Metadata.find({}, 'encFileSize', function(err, files) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, files);
  });
};

