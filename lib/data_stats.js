'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

module.exports = function(req, res) {
  Metadata.find({}, 'encFileSize', function(err, files) {
    responseHandler.send200(res, files);
  });
};

