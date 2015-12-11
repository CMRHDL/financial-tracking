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