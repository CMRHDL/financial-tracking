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
var _ = require('lodash');

// Get list of attributions, ordered by type and displayname
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

// Create new attribution
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

// Delete all attributions
exports.deleteAll = function(req, res) {
  Attr.find({}).remove(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Deleted all Attributions');
  });
};

// Update by Name
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attr.find({}).
    where('name').equals(req.body.name).
    exec(function (err, attr) {
      if (err) {
        res.send(err);
      }
      if(!attr) { return res.status(404).send('Not Found'); }
      if(attr.length > 1) { return res.status(404).send('Too many found'); }
      var renamed = {
        name: req.body.newDisplayName + "_" + req.body.type,
        displayName: req.body.newDisplayName,
        type: req.body.type,
        group: req.body.group,
      }
      var updated = _.merge(attr[0], renamed);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(attr[0]);
      });
    });
};