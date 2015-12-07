'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CodeSchema = new Schema({
  year: Number,
  number: Number,
  page: Number,
  position: Number,
  code: Number,
});

module.exports = mongoose.model('Code', CodeSchema);

