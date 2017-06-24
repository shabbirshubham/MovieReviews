


        var app = require('../../express');
        var passport = require('passport');
        var LocalStrategy= require('passport-local').Strategy;
        var bcrypt = require('bcrypt-nodejs');
        var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
        var FacebookStrategy = require('passport-facebook').Strategy;
        var multer = require('multer'); // npm install multer --save
        var upload = multer({ dest: __dirname+'/../../public/uploads/user-profile-pictures'});
//---------------------------------------------------
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);
        passport.use(new LocalStrategy(localStrategy));
//-----------------------------------------------------------
        var userModel = require('../../model/user/user.model.server');
        var reviewModel = require('../../model/review/review.model.server');
//------------------------------------------------------------
    // All URI

        app.post('/api/project/login',passport.authenticate('local'),login);
        app.post('/api/project/register',register);
        app.get('/api/project/checkLoggedIn',checkLoggedIn);
        app.post('/api/project/logout',logout);
        app.put('/api/project/updateUser:userId',updateUser);
        app.get('/api/project/findUserByUsername',findUserByUsername);
        app.delete('/api/project/deleteUser:userId',deleteUser);
        app.post('/api/project/addToWatchList/:userId',addToWatchList);
        app.delete('/api/project/deleteMoviesFromWatchList/:movieId/user/:userId',deleteMoviesFromWatchList);
        app.get('/api/project/getMoviesFromWatchList/:userId',getMoviesFromWatchList);
        app.post('/api/project/likeMovie/user/:userId',likeMovie);
        app.delete('/api/project/unlikeMovie/:movieId/user/:userId',unlikeMovie);
        app.get('/api/project/getLikedMovies/:userId',getLikedMovies);
        app.post('/api/project/submitReview/user/:userId',submitReview);
        app.get('/api/project/getUserReviews',getUserReviews);
        app.post('/api/editReview/user/:reviewId',editReview);
        app.delete('/api/project/deleteReview/user/:userId/review/:reviewId',deleteReview);
        app.post ("/api/project/uploadProfileImage", upload.single('myFile'), uploadImage);
        app.get('/api/project/getFollowers/:userId',getFollowers);
        app.get('/api/project/getFollowings/:userId',getFollowings);
        app.put('api/project/addFollower/followerId/:followerId/follower/:followeeId',addFollower);
        app.put('api/project/addFollowings/followerId/:followerId/follower/:followeeId',addFollowing);
        app.delete('api/project/removeFollowing/followee/:followerId/follower/:followeeId',removeFollowing);


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

        function checkLoggedIn(req,res) {
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
                var username = req.query.username;
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


        function uploadImage(req, res) {

            var myFile        = req.file;

            var userId = req.body.userId;


            var originalname  = myFile.originalname; // file name on user's computer
            var filename      = myFile.filename;     // new file name in upload folder
            var path          = myFile.path;         // full path of uploaded file
            var destination   = myFile.destination;  // folder where file is saved to
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;
            var url= '/uploads/user-profile-pictures/'+filename;
            var callbackUrl=req.body.callbackUrl;
            //widget = getWidgetById(widgetId);

            userModel
                .uploadProfileImage(userId,url)
                .then(function (status) {
                    //var callbackUrl   = "/#!/profile";
                    // res.sendStatus(200);
                    res.redirect(callbackUrl);
                });
            //widget.url = '/assignment/uploads/'+filename;


        }
        function addFollower(req,res) {
            var followerId = req.followerId;
            var followeeId= req.followeeId;
            userModel.addFollower(followeeId,followerId).then(function () {
                res.sendStatus(200);
            })

        }
        function addFollowing(req,res) {

            var followerId = req.followerId;
            var followeeId= req.followeeId;
            userModel.addFollowing(followeeId,followerId).then(function () {
                res.sendStatus(200);
            })

        }

        function getFollowers(req,res) {

            var userId = req.userId;
            userModel.getFollowers(userId)
                .then(function (user) {
                    res.json(user.followers);
                })
        }

        function getFollowings(req,res) {
            var userId = req.userId;
            userModel.getFollowings(userId)
                .then(function (user) {
                    res.json(user.following);
                })
        }

        function removeFollowing(req,res) {
            var followerId = req.followerId;
            var followeeId= req.followeeId;
            userModel
                .removeFollowing(followeeId,followerId)
                .then(function () {
                res.sendStatus(200);
            })
        }
        function addToWatchList(req,res) {
            var movie = req.body;
            var userId = req.params.userId;
            var movieobject = {
                id:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                vote_average:movie.vote_average,
                overview:movie.overview,
                release_date:movie.release_date,
                genres:movie.genres,
                vote_count:movie.vote_count
               };
            userModel
                .addMovie(userId,movieobject)
                .then(function (response) {
                    res.sendStatus(200);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }

        function getMoviesFromWatchList(req,res) {
            var userId = req.params.userId;
            userModel
                .getMoviesFromWatchList(userId)
                .then(function (movies) {
                    res.send(movies);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }

        function deleteMoviesFromWatchList(req,res) {
            var movieId = req.params.movieId;
            var userId = req.params.userId;
            userModel
                .deleteMoviesFromWatchList(movieId,userId)
                .then(function (response) {
                    res.sendStatus(200);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }

        function likeMovie(req,res) {
            var movie = req.body;
            var userId = req.params.userId;
            var movieobject = {
                id:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                vote_average:movie.vote_average,
                overview:movie.overview,
                release_date:movie.release_date,
                genres:movie.genres,
                vote_count:movie.vote_count
            };
            userModel
                .likeMovie(userId,movieobject)
                .then(function (response) {
                    res.sendStatus(200);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }

        function unlikeMovie(req,res) {
            var movieId = req.params.movieId;
            var userId = req.params.userId;
            userModel
                .unlikeMovie(movieId,userId)
                .then(function (response) {
                    res.sendStatus(200);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }
        
        function getLikedMovies(req,res) {
            var userId = req.params.userId;
            userModel
                .getLikedMovies(userId)
                .then(function (movies) {
                    res.send(movies);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }

        function submitReview(req,res) {
            var review = req.body;
            var userId =  req.params.userId;
            reviewModel
                .createReview(userId,review)
                .then(function (response) {
                    res.send(response);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                });
        }

        function getUserReviews(req,res) {
            reviewModel
                .getAllReviews()
                .then(function (reviews) {
                    res.send(reviews);
                },function (err) {
                    res.sendStatus(404);
                })
        }

        function editReview(req,res) {
            var reviewId = req.params.reviewId;
            var review = req.body;
            reviewModel
                .editReview(reviewId,review)
                .then(function (response) {
                    res.send(response);
                },function (err) {
                    console.log(err);
                    res.sendStatus(404);
                })
        }
        
        function deleteReview(req,res) {
            var userId = req.params.userId;
            var reviewId  = req.params.reviewId;
            reviewModel
                .deleteReview(userId,reviewId)
                .then(function (response) {
                    res.sendStatus(200);
                },function (response) {
                    res.sendStatus(404);
                });
        }
        // function deleteReview(req,res) {
        //     var review = req.body;
        //     var userId =  req.params.userId;
        //     reviewModel
        //         .deleteReview(userId,review)
        //         .then(function (response) {
        //             res.sendStatus(200);
        //         },function (err) {
        //             console.log(err);
        //             res.sendStatus(404);
        //         });
        // }

