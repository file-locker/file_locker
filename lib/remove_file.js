'use strict';

var handleError = require(__dirname + '/./handle_error');
var responseHandler = require(__dirname + '/./response_handler');
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = function(req, res) {
  ee.emit('removeFile', req, res);
};

ee.on('removeFile', function(req, res) {
  File.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
    ee.emit('removeMeta', req, res)
  });
});

ee.on('removeMeta', function(req, res) {
  Metadata.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
    responseHandler.send202(res, 'deleting');
  });
});
