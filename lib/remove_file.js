'use strict';

var handleError = require(__dirname + '/./handle_error');
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');

module.exports = function(req, res) {
  File.remove({_id: req.params.id}, function(err) {
    if (err) handleError.err500(err, res);
    res.json({msg: 'File has been deleted'});
  });
  Metadata.remove({_id: req.params.id}, function(err) {
    if (err) handleError.err500(err, res);
  }); //remove metadata of removed file
};
