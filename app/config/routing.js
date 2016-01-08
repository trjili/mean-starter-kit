var express = require('express');
var routes =  require('../routes');
var parameters = require('./parameters.js');
var path = require('path');

module.exports = function (app) {

    console.log('load routes');

    // load routes in express
    var apiRouter = express.Router();
    routes(apiRouter);
    app.use('/api', apiRouter);

    // Client router
    var clientRouter =  express.Router();
    app.use('/', clientRouter);

    // angular routes
    clientRouter.get('/', function(req, res){
        res.sendfile(path.resolve('public/views/index.html'));
    });

    // route not defined
    app.all("*", function (req, res, next) {
        res.redirect('/404.html');
    });
};
