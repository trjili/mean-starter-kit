// find node modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('express-jwt');
var errorHandler = require('./app/errors/errorHandler');

// find local modules
var parameters = require('./config/parameters.js');
var routes =  require('./app/routes');

// server port
var port = process.env.port || 8080;

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

// jwt config
jwt = jwt({secret: parameters.jwtSecret});
/*app.use(jwt.unless({path: [/^(\/(?!api)).*$/ig]}));*/
app.use(jwt.unless({path: ['/api/authenticate', '/api/register' ]}));

// load routes in express
var router = express.Router();
routes(router, parameters);
app.use('/api', router);

// handle application errors
app.use(errorHandler);

// route not defined
app.all("*", function (req, res, next) {
    next(new NotFoundError("404"));
});

// Requests console log
app.use(morgan('dev'));

// run our application
app.listen(port);

// log start
console.log('Application start listing to the port'+ port);

// set our app as a module
exports = module.exports = app;
