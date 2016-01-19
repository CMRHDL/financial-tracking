'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TableSettingSchema = new Schema({
    id: String,
    height: Number,
    width: Number,
    layout: Object,
});

module.exports = mongoose.model('TableSetting', TableSettingSchema);

