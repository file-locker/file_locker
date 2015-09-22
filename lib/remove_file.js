'use strict';

var handleError = require(__dirname + '/./handle_error');
var responseHandler = require(__dirname + '/./response_handler');
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');

module.exports = function(req, res) {
  File.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
  });
  Metadata.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
  });
  responseHandler.send202(res, 'deleting');
};
