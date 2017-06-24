
(function () {
        angular
            .module("WDP")
            .service('UserService',UserService);
        
        function UserService($http) {
            
            this.login=login;
            this.findUserByCredentials = findUserByCredentials;
            this.register=register;
            this.deleteUser=deleteUser;
            // this.findUserByEmail=findUserByEmail;
            this.findUserByUsername=findUserByUsername;
            this.logout=logout;
            this.checkLoggedIn=checkLoggedIn;
            this.updateUser=updateUser;
            this.createUser=createUser;
            this.addToWatchList = addToWatchList;
            this.getMoviesFromWatchList = getMoviesFromWatchList;
            this.deleteMovie = deleteMovie;
            this.likeMovie = likeMovie;
            this.unlikeMovie = unlikeMovie;
            this.getLikedMovies = getLikedMovies;
            this.submitReview = submitReview;
            this.getUserReviews = getUserReviews;
            this.editReview = editReview;
            this.deleteReview = deleteReview;
                        this.uploadProfileImage = uploadProfileImage;
            this.addFollower=addFollower;
            this.addFollowing=addFollowing;
            this.getFollowers=getFollowers;
            this.getFollowings=getFollowings;
            this.removeFollowing = removeFollowing;
            this.getAllReviews = getAllReviews;

            function login(username,password) {
                var url = "/api/project/login";
                var credentials = {
                    username:username,
                    password:password,
                    role:'critic'
                };
                return $http.post(url, credentials)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function register(user) {
                var url = "/api/project/register";
                return $http.post(url,user)
                    .then(function (response) {
                        return response.data;
                    })
            }
            
            function deleteUser(userId) {
                var url = "/api/project/deleteUser/"+userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    },function (err) {
                        console.log(err);
                    })
            }
            
            function findUserByUsername(username) {
                var url = "/api/project/findUserByUsername?username="+username;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function logout() {
                var url = "/api/project/logout";
                return $http.post(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function checkLoggedIn() {
                var url = "/api/project/checkLoggedIn";
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updateUser(userId,user) {
                var url = "/api/project/updateUser/"+userId;
                return $http.put(url,user)
                    .then(function (response) {
                        return response.data;
                    })
            }

            function createUser(user) {
                var url = "/api/project/user";
                // first takes url , second is the actual data
                return $http
                    .post(url,user)
                    .then(function (response) {
                        return response.data;
                    })
            }

            function findUserByCredentials(username,password) {
                var url = "/api/project/user?username="+username+"&password="+password;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function addToWatchList(movie,userId) {
                var url = "/api/project/addToWatchList/"+userId;
                return $http.post(url,movie)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getMoviesFromWatchList(userId) {
                var url = "/api/project/getMoviesFromWatchList/"+userId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function deleteMovie(movieId,userId) {
                var url = "/api/project/deleteMoviesFromWatchList/"+movieId+"/user/"+userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function likeMovie(movie,userId) {
                // console.log("movie is "+movie.title);
                var url = "/api/project/likeMovie/user/"+userId;
                return $http.post(url,movie)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function unlikeMovie(movieId,userId) {
                var url = "/api/project/unlikeMovie/"+movieId+"/user/"+userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getLikedMovies(userId) {
                var url = "/api/project/getLikedMovies/"+userId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function submitReview(userId,movieId,rating,review,username,title) {
                var userReview = {
                    rating:rating,
                    text:review,
                    movieId:movieId,
                    userId:userId,
                    username:username,
                    movieName:title
                };
                var url = "/api/project/submitReview/user/"+userId;
                return $http.post(url,userReview)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getUserReviews(userId) {
                var url = "/api/project/getUserReviews/"+userId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function editReview(reviewId,review) {
                var url = "/api/editReview/user/"+reviewId;
                return $http.post(url,review)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function deleteReview(userId,reviewId) {
                var url = "/api/project/deleteReview/user/"+userId+"/review/"+reviewId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            function uploadProfileImage() {
                console.log('image uploaded');
            }

            function addFollower(followerId,followeeId) {

                var url = '/api/project/addFollower/followerId/'+followerId+'/follower/'+followeeId;
                return $http.put(url).then(function (response) {
                    return response.data;
                })
            }
            function addFollowing(followerId,followeeId) {

                var url = '/api/project/addFollowing/followerId/'+followerId+'/follower/'+followeeId;
                return $http.put(url).then(function (response) {
                    return response.data;
                })
            }

            function getFollowings(userId) {

                var url = '/api/project/getFollowings/'+userId;
                return $http.get(url).then(function (response) {
                    return response.data;
                })
            }

            function getFollowers(userId) {

                var url = '/api/project/getFollowers/'+userId;
                return $http.get(url).then(function (response) {
                    return response.data;
                })
            }

            function removeFollowing(followeeId,userId) {
                var url = '/api/project/removeFollowing/followee/'+followeeId+'/follower/'+userId;
                return $http.delete(url).then(function (response) {
                    return response.data;
                })
            }            
            
            function getAllReviews() {
                var url = "/api/project/getAllReviews";
                return $http.get(url).
                then(function (response) {
                    return response.data;
                })
            }
        }
    }
    
)();