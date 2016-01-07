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
        if (req.user) res.redirect('/');
        res.sendfile(path.resolve('public/views/index.html'));
    });
    clientRouter.get('/login', function(req, res){
        if (req.user) res.redirect('/');
        res.sendfile(path.resolve('public/views/security/login.html'));
    });

    // route not defined
    app.all("*", function (req, res, next) {
        res.redirect('/404.html');
    });
};
