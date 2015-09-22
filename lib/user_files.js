'use strict';

var handleError = require(__dirname + '/./handle_error');
var Metadata = require(__dirname + '/../models/metadata');

module.exports = function(req, res) {
  Metadata.find({createdBy: req.auth.user}, 'name', function(err, files) {
    var usersFiles = files.toString();
    res.json({msg: usersFiles});
  });
};
