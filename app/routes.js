var parameters = require('./config/parameters');

// routes
module.exports = function(router) {

    // find models
    var user = require('./models/users');
    var UnauthorizedAccessError = require('./errors/unauthorizedAccessError');
    var jwt = require('jsonwebtoken');
    _ = require("lodash");

    // middleware to deliverer an access token
    var authenticate = function (req, res, next) {
        var username = req.body.username,
            password = req.body.password;
            console.log(username);
            console.log(password);

        if (_.isEmpty(username) || _.isEmpty(password)) {
            return next(new UnauthorizedAccessError("401", {
                message: 'Invalid username or password'
            }));
        }

        process.nextTick(function () {
            user.findOne({
                username: username
            }, function (err, user) {
                if (err || !user) {
                    return next(new UnauthorizedAccessError("401", {
                        message: 'User not found.'
                    }));
                }
                console.log(user.password);
                user.comparePassword(password, function (err, isMatch) {
                    if (isMatch && !err) {
                        req.token = jwt.sign(user, parameters.jwtSecret, {expiresIn: 3000});
                        next();
                    } else {
                        return next(new UnauthorizedAccessError("401", {
                                message: 'Invalid username or password'
                        }));
                    }
                });
            });

        });
    };

    // Authenticate
    router.route('/authenticate')
    .post(authenticate, function(req, res, next){
        res.json({token: req.token});
    });

    // Register
    router.route('/register')
        .post(function(req, res, next){
            var newUser = new user();
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.role = req.body.role;
            newUser.email = req.body.email;
            newUser.enabled = req.body.enabled;
            newUser.save(function(err){
                next(err);
                res.json({'success': true});
            });
        });

    /* User crud */
    router.route('/users')
        .get(function(req, res, next){
            user.find(function(err, users){
                if (err) { return next(err); }
                res.json(users);
            });
        });

    router.route('/users/:user_id')
        .get(function(req, res, next){
            user.findById(req.params.user_id, function(err, user){
                if (err) { return next(err); }
                res.json(user);
            });
        })
        .put(function(req, res, next){
            user.findById(req.params.user_id, function(err, user){
                if (err) { return next(err); }
                user.name = req.body.name;
                user.old = req.body.old;
                user.save(function(err){
                    if (err){
                        res.send(err);
                    }else{
                        res.json({update: true});
                    }
                });
            });
        })
        .delete(function(req, res, next){
            user.remove({_id: req.params.user_id}, function(err, user){
                next(err);
                res.json({success: true, user_id: req.params.user_id});
            });
        });

    // angular routes
    router.get('/', function(req, res){
        res.sendfile('../public/views/index.html');
    });

};