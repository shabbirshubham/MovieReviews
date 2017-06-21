


        var app = require('../../express');
        var passport = require('passport');
        var LocalStrategy= require('passport-local').Strategy;
        var bcrypt = require('bcrypt-nodejs');
        var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
        var FacebookStrategy = require('passport-facebook').Strategy;

//---------------------------------------------------
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);
        passport.use(new LocalStrategy(localStrategy));
//-----------------------------------------------------------
        var userModel = require('../../model/user/user.model.server');
//------------------------------------------------------------
    // All URI

        app.post('/api/project/login',passport.authenticate('local'),login);
        app.post('/api/project/register',register);
        app.get('/api/project/checkLoggedinUser',checkLoggedinUser);
        app.post('/api/project/logout',logout);
        app.put('/api/project/updateUser',updateUser);
        app.get('/api/project/findUserByUsername',findUserByUsername);
        app.delete('/api/project/deleteUser',deleteUser);

        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
        app.get('/google/callback',
            passport.authenticate('google', {
                successRedirect: '/',
                failureRedirect: '/'
            }));

        app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/'
            }));

        var googleConfig = {
            clientID     : "425690137519-fc8lierptvbhfhj1oa4bqgbn159ectkr.apps.googleusercontent.com",
            clientSecret : "EMtx7lnIFVE_oFkveJK4mY0x",
            callbackURL  : "http://localhost:3200/google/callback"
        };
        var facebookConfig = {
            // clientID     : "242625612892833",
            // clientSecret : "0c36a8f1fbe8ca589dfc83ca8dfd442e",
            // callbackURL  : "https://deb-shubham-webdev.herokuapp.com/auth/facebook/callback",
            clientID     : "242625612892833",
            clientSecret : "0c36a8f1fbe8ca589dfc83ca8dfd442e",
            // callbackURL  : "https://deb-shubham-webdev.herokuapp.com/auth/facebook/callback",
            callbackURL  : "http://localhost:3200/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'email']
        };

        passport.use(new GoogleStrategy(googleConfig, googleStrategy));
        passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
//------------------------------------------------------------
        // ALL function definitions

        function localStrategy(username, password, done) {
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

        function facebookStrategy(token, refreshToken, profile, done) {
            userModel
                .findUserByFacebookId(profile.id)
                .then(
                    function(user) {
                        if(user) {
                            return done(null, user);
                        } else {
                            console.log(profile);
                            var email = profile.emails[0].value;
                            var emailParts = email.split("@");
                            var newFacebookUser = {
                                username:  emailParts[0],
                                firstName: profile.name[0],
                                lastName:  profile.name[1],
                                email:     email,
                                facebook: {
                                    id:    profile.id,
                                    token: token
                                }
                            };
                            return userModel.createUser(newFacebookUser);
                        }
                    },
                    function(err) {
                        if (err) { return done(err); }
                    }
                )
                .then(
                    function(user){
                        return done(null, user);
                    },
                    function(err){
                        if (err) { return done(err); }
                    }
                );
        }

        function googleStrategy(token, refreshToken, profile, done) {
            userModel
                .findUserByGoogleId(profile.id)
                .then(
                    function(user) {
                        if(user) {
                            return done(null, user);
                        } else {
                            var email = profile.emails[0].value;
                            var emailParts = email.split("@");
                            var newGoogleUser = {
                                username:  emailParts[0],
                                firstName: profile.name.givenName,
                                lastName:  profile.name.familyName,
                                email:     email,
                                google: {
                                    id:    profile.id,
                                    token: token
                                }
                            };
                            return userModel.createUser(newGoogleUser);
                        }
                    },
                    function(err) {
                        if (err) { return done(err); }
                    }
                )
                .then(
                    function(user){
                        console.log(user);
                        return done(null, user);
                    },
                    function(err){
                        if (err) { return done(err); }
                    }
                );
        }

