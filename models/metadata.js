'use strict';

var mongoose = require('mongoose');

var metadataSchema = new mongoose.Schema({
  name: String,
  tags: String,
  description: String,
  fileLink: String, //file id
  orgFileSize: Number,
  encFileSize: Number,
  createdBy: String
});

module.exports = mongoose.model('Metadata', metadataSchema);
