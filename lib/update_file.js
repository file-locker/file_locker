'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

//this module will only update qualitative meta data

module.exports = function(req, res) {
  Metadata.findOne({_id: req.params.id}, function(err, data) {
    if (err) return handleError(err, res);

    var updateFile = data;
    updateFile.name = req.name;
    updateFile.tags = req.tags;
    updateFile.description = req.description;

    updateFile.save(function(err, data) {
      if (err) return handleError(err, res);
    });
    responseHandler.send202(res, 'Updating metadata');
  });
};
