var express = require('express');
var routes =  require('../routes');
var parameters = require('./parameters.js');

module.exports = function (app) {

    console.log('load routes');
    // load routes in express
    var router = express.Router();
    routes(router);
    app.use('/api', router);

    // route not defined
    app.all("*", function (req, res, next) {
        res.redirect('/404.html');
    });
};
