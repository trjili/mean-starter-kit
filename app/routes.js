// find models

var user = require('./models/users');

// routes
module.exports = function(router) {

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // logging request
        console.log('Dispatching route'+req.body.name);
        next();
    });

    // simple api route without auth for now
    router.route('/users')
        .post(function (req, res) {
            var newUser = new user();
            newUser.name = req.body.name;
            newUser.old = req.body.old;
            newUser.save(function(err){
                if (err) {
                    res.send(err);
                } else {
                    res.json({'success': true});
                }
            });
        })
        .get(function(req, res){
            user.find(function(users, err){
                if (err){
                    res.send(err);
                }else{
                    res.json(users);
                }
            });
        });

    router.route('/users/:user_id')
        .get(function(req, res){
            user.findById(req.params.nerd_id, function(err, user){
                if (err){
                    res.send(err);
                } else {
                    res.json(user);
                }
            });
        })
        .put(function(req, res){
            user.findById(req.params.user_id, function(err, user){
                if (err){
                    res.send(err);
                }else{
                    user.name = req.body.name;
                    user.old = req.body.old;
                    user.save(function(err){
                        if (err){
                            res.send(err);
                        }else{
                            res.json({update: true});
                        }
                    });
                }
            });
        })
        .delete(function(req, res){
            user.remove({_id: req.params.user_id}, function(err, user){
                if (err){
                    res.send(err);
                } else {
                    res.json({sucess: true, user_id: req.params.user_id});
                }
            });
        });

    // angular routes
    router.get('*', function(req, res){
        res.sendfile('../public/views/index.html');
    });


};