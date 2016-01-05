var jwt = require('express-jwt');
var parameters = require('./parameters.js');

module.exports = function(app){
    // jwt config
    jwt = jwt({secret: parameters.jwtSecret});
    app.use(jwt.unless({path: [/^(\/(?!api\/(?!register|authenticate))).*$/ig]}));
};
