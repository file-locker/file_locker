'use strict';

var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
  metadata: {type: String},
  fileContents: {type: String, required: true}
});
