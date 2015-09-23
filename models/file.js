'use strict';

var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
  // metadata: {type: String, required: true},
  fileContents: {type: String, required: true}
});

module.exports = mongoose.model('File', fileSchema);
