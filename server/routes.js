'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/attr', require('./api/attribution'));
  app.use('/api/code', require('./api/code'));
  app.use('/api/recordset', require('./api/recordset'));
  app.use('/api/tablesetting', require('./api/tablesetting'));
  app.use('/api/setting', require('./api/setting'));

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve('client/index.html'));
    });
};