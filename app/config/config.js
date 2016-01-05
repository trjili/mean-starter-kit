var errorHandler = require('../errors/errorHandler');

module.exports = function(app) {
    app.use(errorHandler);
};
