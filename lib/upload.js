'use strict';

var handleError = require(__dirname + '/./handle_error');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var responseHandler = require(__dirname + '/./response_handler');

module.exports = function(req, res) {
  var newFile = new File(req.body);
  //need to split file from metadata 

  newFile.save(function(err, id) {
    if (err) handleError.err500(err, res);
    responseHandler.send201(res, id);
  });
};
