


        var app = require('../../express');
        var passport = require('passport');
        var localStrategy= require('passport-local').Strategy;
        var bcrypt = require('bcrypt-nodejs');

//---------------------------------------------------
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);
        passport.use(new LocalStrategy(localStrategy));
//-----------------------------------------------------------
        var userModel = require('../../model/user/user.model.server');
//------------------------------------------------------------
    // All URI

        app.post('/api/project/login',passport.authenticate('local'),login);
        app.post('/api/project/login',register);
        app.get('/api/project/checkLoggedinUser',checkLoggedinUser);
        app.post('/api/project/logout',logout);
        app.put('/api/project/updateUser',updateUser);
        app.get('/api/project/findUserByUsername',findUserByUsername);
        app.delete('/api/project/deleteUser',deleteUser);

//------------------------------------------------------------
        // ALL function definitions

        function LocalStrategy(username, password, done) {
                userModel
                    .findUserByCredentials(username,password)
                    .then(function (user) {
                        if(user && bcrypt.compareSync(password,user.password)){
                            return done(null,user);
                        }
                        else{
                              return done(null,false);
                        }
                    },function (err) {
                        return done(err);
                    })
        }

        function login(req,res) {
                var user = req.user;
                res.json(user);
        }

        function register(req,res) {
                var user = req.body;
                user.password=bcrypt.hashSync(user.password);
                userModel
                    .createUser(user)
                    .then(function (user) {
                            req.login(user,function () {
                                res.json(user);
                            })

                    },function () {
                        res.sendStatus(404);
                })
        }

        function checkLoggedinUser(req,res) {
                res.send(req.isAuthenticated()? req.user:'0');
        }

        function logout(req,res) {
                req.logout();
                res.sendStatus(200);
        }

        function updateUser(req,res) {
            var user = req.body;
            var userId = user._id;
            userModel
                .updateUser(userId,user)
                .then(function () {
                    res.sendStatus(200);
                })
        }

        function findUserByUsername(req,res) {
                var username = req.params.username;
                userModel
                    .findUserByUsername(username)
                    .then(function (user) {
                        res.json(user);
                    },function () {
                        res.sendStatus(404);
                    })
        }

        function deleteUser(req,res) {
                var userId = req.params.userId;
                userModel
                    .deleteUser(userId)
                    .then(function () {
                        res.sendStatus(200);
                    });
        }

        function serializeUser(user,done) {
            done(null,user);
        }

        function deserializeUser(user,done) {
                userModel
                    .findUserById(user._id)
                    .then(function (user) {
                        done(null,user);
                    },function (err) {
                        done(err,null)
                    });
        }


