'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

//this module will only update qualitative meta data

module.exports = function(req, res) {
  ee.emit('findMeta', req, res);
};

ee.on('findMeta', function(req, res) {
  Metadata.findOne({_id: req.params.id}, function(err, data) {
    if (err) return handleError.err404(err, res);
    data.name = req.body.name;
    data.tags = req.body.tags;
    data.description = req.body.description;
    ee.emit('saveMeta', req, res, data);
  });
});

ee.on('saveMeta', function(req, res, data) {
  data.save(function(err, msg) {
    if (err) return handleError.err500(err, res);
    responseHandler.send202(res, msg);
  });
});

