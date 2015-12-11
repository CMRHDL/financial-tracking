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
  Code.find(function(err, codes) {
    if (err) { 
      res.send(err);
    }
    res.json(codes);
  });
};

// Get list of attributions
exports.max = function(req, res) {
  Code.findOne()
    .where({})
    .sort('-code')
    .exec(function(err, maxCode) {
    if (err) { 
      res.send(err);
    }
    console.log(maxCode);
    res.json(maxCode);
  });
};

// Creates a new attribution in the DB.
exports.create = function(req, res) {
  var code = new Code(req.body);
  code.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and done');
  });
};

// Delete all codes in the DB.
exports.deleteAll = function(req, res) {
  Code.find({}).remove(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('All well and gone');
  });
};
