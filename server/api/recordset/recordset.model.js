'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RecordsetSchema = new Schema({
  amount: Number,
  attribution: Object,
  code: Number,
  date: Date,
  description: String,
  gains: Number,
  expenses: Number,
});

module.exports = mongoose.model('Recordset', RecordsetSchema);

