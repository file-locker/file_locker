'use strict';

var handleError = require(__dirname + '/handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/response_handler');

module.exports = function(req, res) {
  Metadata.find({}, 'encFileSize', function(err, files) {
    var totalSize = 0;
    for (var i = 0; i < files.length; i++) {
      totalSize += files[i]._doc.encFileSize;
    }
    var stats = {
      fileCount: files.length,
      diskSize: totalSize
    };
    
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, stats);
  });
};

