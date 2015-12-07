/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Code = require('./code.model');

// Get list of attributions
exports.index = function(req, res) {
  Code.find(function(err, recordset) {
    if (err) { 
      res.send(err);
    }
    res.json(recordset);
  });
};

// Creates a new attribution in the DB.
exports.create = function(req, res) {
  var recordset = new Code(req.body);
  recordset.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and done');
  });
};
