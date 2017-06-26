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
        model.unfollow=unfollow;
        model.viewPerson=viewPerson;
        model.gotoFollowingPerson=gotoFollowingPerson;
        model.gotoFollower=gotoFollower;
        model.username=model.user.username;
        model.email=model.user.email;
        model.firstName=model.user.firstName;
        model.lastName=model.user.lastName;
        model.checkPassword=checkPassword;
        model.changePassword=changePassword;
        model.searchMovie = searchMovie;

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

                UserService
                    .getFollowings(model.userId)
                    .then(function (following) {
                        return  model.following=model.user.following=following;
                    });


                UserService
                    .getFollowers(model.userId)
                    .then(function (followers) {
                        return  model.followers=model.user.followers=followers;
                    });
        }init();

        function searchMovie(query) {
            $location.url('/movie/search/'+query);
        }

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
            UserService
                .updateUser(model.user._id,model.user)
                .then(function (status) {
                    model.updateSucces='Profile Updated';
                })
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


        function unfollow(followeeId) {
            var followerId= model.user._id;
            UserService.unfollow(followeeId,followerId).then(function () {

                for(var i in model.user.following){
                    var following = model.user.following[i];
                    if(following._id===followeeId){
                        return model.user.following.splice(i,1);
                    }
                }
            })
        }

        function viewPerson(id) {
            model.watchingProfile = id;
        }

        function gotoFollowingPerson(personId) {
            for(var i in model.following){
                var person=model.following[i];
                if(personId === person._id){
                    model.person = person;
                    $location.url('/user/view_person/'+personId);
                }
            }
        }

        function gotoFollower(personId) {
            for(var i in model.followers){
                var person=model.followers[i];
                if(personId === person._id){
                    model.person = person;
                    $location.url('/user/view_person/'+personId);
                }
            }
        }

        function checkPassword() {

                return model.pwdMismatch='';
        }

        function changePassword(newPwd,oldPwd) {
            if(newPwd !== model.confirmPwd){
                return model.pwdMismatch=true;
            }
            UserService
                .changePassword(model.user._id,newPwd,oldPwd)
                .then(function (response) {

                    if(response ==='OK'){
                        model.pwdUpdateSuccess='Password Updated';
                    }
                    else{
                        model.pwdUpdateFailure=response;
                    }

                });
        }

    }
})();