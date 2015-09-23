'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

//this module will only update qualitative meta data

module.exports = function(req, res) {
  Metadata.findOne({_id: req.params.id}, function(err, data) {
    if (err) return handleError(err, res);
    data.name = req.body.name;
    data.tags = req.body.tags;
    data.description = req.body.description;
    data.save(function(err, msg) {
      if (err) return handleError(err, res);
      responseHandler.send202(res, msg);
    });
  });
};
