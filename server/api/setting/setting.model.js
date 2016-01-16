'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingSchema = new Schema({
    initialAmount: Number,
});

module.exports = mongoose.model('Setting', SettingSchema);

