/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var TableSetting = require('./tablesetting.model');
var _ = require('lodash');

// Get all tablesettings
exports.index = function(req, res) {
  TableSetting.find(function(err, recordset) {
    if (err) {
      res.send(err);
    }
    res.json(recordset);
  });
};

// Create a new tablesetting
exports.create = function(req, res) {
  var tablesetting = new TableSetting(req.body);
  tablesetting.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Created new Tablesetting');
  });
};

// get tablesetting by Id
exports.show = function(req, res) {
  TableSetting.find({}).
    where('id').equals(req.params.id).
    exec(function (err, tablesetting) {
      if (err) {
        res.send(err);
      }
      res.json(tablesetting);
    });
};

// update tablesetting by Id
exports.update = function(req, res) {
  var conditions = { 'id': req.body.id };
  var update = { $set: req.body }
  var options = { multi: false };
  TableSetting.update(conditions, update, options, function (err) {
    if (err) {
      res.send(err);
    }
    res.json('tablesetting for ' + req.body.id + ' was updated');
  });
};
