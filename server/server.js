var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// configuration ===========================================
  
// config files
var db = require('./db');

var port = 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(path.resolve('client'))); // set the static files location /public/img will be /img for users
app.use('/bower_components', express.static(path.resolve('bower_components'))); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./routes/attribution.route.js')(app); // pass our application into our routes
var server = require('http').createServer(app);
// start app ===============================================
//server.listen(port); 

server.listen(8080, 'localhost', function () {
  console.log('Express server listening on %d, in port %s', 8080, 'localhost');
});

console.log('Magic happens on port ' + port);       // shoutout to the user
exports = module.exports = app; 