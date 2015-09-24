'use strict';

var handleError = require(__dirname + '/./handle_error');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = function(req, res) {
  var file = {};
  file.fileContents = req.body.fileContents;
  var newFile = new File(file);
  ee.emit('saveFile', req, res, newFile);
};

ee.on('saveFile', function(req, res, newFile) {
  newFile.save(function(err, data) {
    if (err) return handleError.err500(err, res);
    var savedFile = data;
    var meta = {};
    meta.name = req.body.name;
    meta.tags = req.body.tags;
    meta.description = req.body.description;
    meta.createdBy = req.body.createdBy;
    meta.orgFileSize = req.body.orgFileSize;

    meta.fileLink = data._id.toString();
    meta.encFileSize = data.fileContents.length;

    var newMeta = new Metadata(meta);
    ee.emit('saveMeta', req, res, savedFile, newMeta);
  });
});

ee.on('saveMeta', function(req, res, savedFile, newMeta) {
  newMeta.save(function(err, data) {
    if (err) return handleError.err500(err, res);
    responseHandler.send201(res, savedFile);
  });
}); 
