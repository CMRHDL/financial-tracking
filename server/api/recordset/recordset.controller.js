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
var backup = require('mongodb-backup');

// Get all recordsets
exports.index = function(req, res) {
  Recordset.find(function(err, recordset) {
    if (err) {
      res.send(err);
    }
    res.json(recordset);
  });
};

// Backup Recordset
exports.backup = function(req, res) {
  var dir = __dirname + '/backup/' + +new Date();
  backup({
    uri: 'mongodb://127.0.0.1:27017/team',
    root: dir,
    callback: function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('backed up');
        res.json(dir);
      }
    }
  });
};

// Create new recordset
exports.create = function(req, res) {
  var recordset = new Recordset(req.body);
  recordset.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Created new Recordset');
  });
};

// Delete all recordsets
exports.deleteAll = function(req, res) {
  Recordset.find({}).remove(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Deleted all Recordsets');
  });
};

// Delete recordset by id
exports.deleteById = function(req, res) {
  backup({
    uri: 'mongodb://127.0.0.1:27017/team',
    root: __dirname + '/backup/' + +new Date(),
    callback: function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('backed up');
        Recordset.findOne({ _id: req.params.id }).remove(function (err) {
          if (err) {
            res.send(err);
          }
          res.json('Deleted Recordset for id' + req.params.id);
        });
      }
    }
  });
};

// patch attribution where needed when changing Attribution
exports.patchAttribution = function(req, res) {
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
    res.json('Updated all Recordsets where attribution.name = ' + req.body.name );
  });
};

// update recordset by Code
exports.update = function(req, res) {
  var conditions = { '_id': req.body._id };
  var update = { $set: req.body }
  var options = { multi: false };
  Recordset.update(conditions, update, options, function (err) {
    if (err) {
      res.send(err);
    }
    res.json('recordset for ' + req.body._id + ' was updated');
  });
};

// Get last added Date
exports.lastAddedDate = function(req, res) {
  Recordset.findOne({})
    .sort({ date: -1 })
    .exec(function(err, date) {
      if (err) {
        res.send(err);
      }
      res.json(date);
    });
};

// Filter
exports.filter = function(req, res) {
  var query = Recordset.find({});
  if (req.body.attributionIds.length > 0) {
    query = query.where('attribution._id').in(req.body.attributionIds);
  }
  if (req.body.minDate) {
    query = query.where('date').gt(new Date(req.body.minDate));
  }
  if (req.body.maxDate) {
    query = query.where('date').lt(new Date(req.body.maxDate));
  }
  query.exec(function(err, recordset) {
    if (err) {
      res.send(err);
    }
    res.json(recordset);
  });
};
