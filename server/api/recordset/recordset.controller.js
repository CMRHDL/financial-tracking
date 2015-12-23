/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Recordset = require('./recordset.model');
var _ = require('lodash');

// Get list of attributions
exports.index = function(req, res) {
  Recordset.find(function(err, recordset) {
    if (err) {
      res.send(err);
    }
    res.json(recordset);
  });
};

// Creates a new attribution
exports.create = function(req, res) {
  var recordset = new Recordset(req.body);
  recordset.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and done');
  });
};

// Delete all attributions
exports.deleteAll = function(req, res) {
  Recordset.find({}).remove(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and gone');
  });
};

// Delete all attributions
exports.update = function(req, res) {
  var renamed = {
    name: req.body.newDisplayName + "_" + req.body.type,
    displayName: req.body.newDisplayName,
    type: req.body.type,
    group: req.body.group,
  }
  var conditions = { 'attribution.name': req.body.name };
  var update = { $set: { attribution: renamed }}
  var options = { multi: true };
  Recordset.update(conditions, update, options, function (err) {
    if (err) {
      res.send(err);
    }
    res.json('something was updated');
  });
};