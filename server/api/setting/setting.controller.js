/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Setting = require('./setting.model');
var _ = require('lodash');

// Get all settings
exports.index = function(req, res) {
  Setting.find(function(err, setting) {
    if (err) {
      res.send(err);
    }
    res.json(setting);
  });
};

// Create new recordset
exports.create = function(req, res) {
  var setting = new Setting(req.body);
  setting.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Created new Setting');
  });
};
