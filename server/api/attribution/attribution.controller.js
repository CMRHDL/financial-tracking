/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Attr = require('./attribution.model');

// Get list of attributions
exports.index = function(req, res) {
  Attr.find({})
    .sort({ type: 1, displayName: 1 })
    .exec(function(err, attributions) {
      if (err) { 
        res.send(err);
      }
      res.json(attributions);
    });
};

// Creates a new attribution in the DB.
exports.create = function(req, res) {
  var attr = new Attr({ 
    name: req.body.name,
    displayName: req.body.displayName,
    type: req.body.type,
    group: req.body.group,
  });
  attr.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json(attr);
  });
};

// Delete all attributions in the DB.
exports.deleteAll = function(req, res) {
  Attr.find({}).remove(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and gone');
  });
};