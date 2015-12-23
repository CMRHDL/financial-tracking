'use strict';

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');

// configuration ===========================================

// config files
var url = 'mongodb://localhost:27017/team';
var port = 8080;
var ip = 'localhost';

mongoose.connect(url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(path.resolve('client'))); // set the static files location /client
app.use('/bower_components', express.static(path.resolve('bower_components'))); // set the static files location /bower_components

// routes ==================================================
require('./routes')(app); // pass our application into our routes

// start app ===============================================
var server = require('http').createServer(app);
server.listen(port, ip, function () {
  console.log('Express server listening on %d, in port %s', 8080, 'localhost');
});

exports = module.exports = app;