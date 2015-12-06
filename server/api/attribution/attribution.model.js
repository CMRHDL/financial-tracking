'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttrSchema = new Schema({
  name: String,
  displayName: String,
  type: String,
  group: String,
});

module.exports = mongoose.model('Attr', AttrSchema);