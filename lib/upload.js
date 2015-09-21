'use strict';

var handleError = require(__dirname + '/./handle_error');
var jsonParser = require('body-parser').json();
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');

module.exports = function(req, res) {
  var newFile = new File(req.body);

  newFile.save(function(err, id) {
    if (err) handleError.err500(err, res);
    var newMeta = new Metadata(id); //create new metadata for file
    //save metadata for new upload
  });
};
