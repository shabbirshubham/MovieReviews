(function () {
    
    angular.module("WDP").controller('profileCtrl',profileCtrl);
    
    function profileCtrl(UserService,isLoggedIn,$location,$route) {

        var model = this;
        model.deleteMovie = deleteMovie;
        model.deleteLikedMovie = deleteLikedMovie;
        model.user=model.isLoggedIn=isLoggedIn;
        model.profilePic='';
        model.logout = logout;
        model.curUrl = $location.path();
        model.deleteUser=deleteUser;
        model.updateUser=updateUser;
        model.getFollowings=getFollowings;
        model.getFollowers=getFollowers;
        model.removeFollowing=removeFollowing;
        function init() {
            model.userId = isLoggedIn._id;

            UserService
                .getUserReviews(model.userId)
                .then(function (userreviews) {
                    model.userreviews = userreviews;
                });

            UserService
                .getMoviesFromWatchList(model.userId)
                .then(function (movies) {
                    if(movies.length>0)
                        model.movies = movies;
                });

            UserService
                .getLikedMovies(model.userId)
                .then(function (likedmovies) {
                    if(likedmovies.length>0)
                        model.likedmovies = likedmovies;
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
        
        
        function deleteUser() {
            
        }
        function updateUser() {

        }

        function deleteMovie(movieId) {
            UserService
                .deleteMovie(movieId,model.userId)
                .then(function (response) {
                    UserService
                        .getMoviesFromWatchList(model.userId)
                        .then(function (movies) {
                            if(movies.length>0)
                                model.movies = movies;
                        });
                    // $location.url('/user/watchlist');
                });
        }

        function deleteLikedMovie(movieId) {
            UserService
                .unlikeMovie(movieId,model.userId)
                .then(function (response) {
                    // console.log(response);
                    UserService
                        .getLikedMovies(model.userId)
                        .then(function (movies) {
                            if(movies.length>0)
                                model.movies = movies;
                        });
                    // $location.url('/user/watchlist');
                });
        }

function getFollowings(userId) {

            return UserService
                .getFollowings(userId)
                .then(function (following) {
                  return  model.user.following=following;
                })
        }

        function getFollowers(userId) {

            return UserService
                .getFollowers(userId)
                .then(function (follower) {
                  return  model.user.follower=follower;
                })
        }

        function removeFollowing(followeeId,userId) {
            return UserService
                .removeFollowing(userId)
                .then(function () {

                })
        }

    }
})();