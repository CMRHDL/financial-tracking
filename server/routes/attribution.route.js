//var Attribtion = require('./models/attributions');
var path = require('path');

module.exports = function(app) {
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // sample api route
  app.get('/api/attribtions', function(req, res) {
    // use mongoose to get all nerds in the database
    // Attribtion.find(function(err, nerds) {
    //   if (err) { res.send(err); }
    //   res.json(nerds); // return all nerds in JSON format
    // });
      res.json('/api/attribtions');
      //console.log('/api/attribtions');
  });

  // route to handle creating goes here (app.post)
  // route to handle delete goes here (app.delete)

  // frontend routes =========================================================
  // route to handle all angular requests
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve('client/index.html'));
    });

};