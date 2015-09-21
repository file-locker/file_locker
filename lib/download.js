'use strict';

var handleError = require(__dirname + '/./handle_error');
var File = require(__dirname + '/../models/file');

module.exports = function(req, res) {
  File.findOne({_id: req.params.id}, function(err, file) {
    if (err) handleError.err500(err, res);
    res.write(file); //respond with requested file
  });
};
