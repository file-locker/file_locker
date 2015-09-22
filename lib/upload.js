'use strict';

var handleError = require(__dirname + '/./handle_error');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

module.exports = function(req, res) {
  var file = {};
  file.fileContents = req.body.fileContents;
  var newFile = new File(file); 
  newFile.save(function(err, data) {
    if (err) return handleError.err500(err, res);

    var meta = {};
    meta.name = req.body.name;
    meta.tags = req.body.tags;
    meta.description = req.body.description;
    meta.createdBy = req.body.createdBy;
    meta.orgFileSize = req.body.orgFileSize;

    //save new file id to metadata.fileLink
    meta.fileLink = data._id.toString();

    var newMeta = new Metadata(meta);
    newMeta.save(function(err, data) {
      if (err) return handleError.err500(err, res);
    });
    responseHandler.send202(res, data);
  }); 
};
