// find node modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./app/config/config');
var routing = require('./app/config/routing');
var security = require('./app/config/security');
var parameters = require('./app/config/parameters.js');

// mongoose connexion
mongoose.connect(parameters.database);

// parsing application/json
app.use(bodyParser.json());

// parsing application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend: true}));

app.use(bodyParser());

// Simulate DELETE/PUT with th use of the header X-HTTP-Method-Override
app.use(methodOverride('X-HTTP-Method-Override'));

// users see static files begin with /css or /js instead of /public/css/ and /public/js
app.use(express.static(__dirname+'/public'));

// security
security(app);

// general config
config(app);

// routing
routing(app);

// Requests console log
app.use(morgan(parameters.server.env));

// run our application
app.listen(parameters.server.port);

// log start
console.log('Application start listing to the port'+ parameters.server.port);

// set our app as a module
exports = module.exports = app;
