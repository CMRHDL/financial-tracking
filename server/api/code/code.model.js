'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CodeSchema = new Schema({
  code: String,
});

module.exports = mongoose.model('Code', CodeSchema);

