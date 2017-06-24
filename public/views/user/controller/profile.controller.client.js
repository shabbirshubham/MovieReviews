(function () {
    
   var app= angular.module("WDP")
       app.controller('profileCtrl',profileCtrl);

    function profileCtrl(isLoggedIn,UserService,$location) {



        var model = this;
        model.user= model.isLoggedIn=isLoggedIn;
        model.profilePic='';
        model.logout = logout;
        model.curUrl = $location.path();
        
        model.deleteUser=deleteUser;
        // model.findUserByEmail=findUserByEmail;
        model.logout=logout;
        model.updateUser=updateUser;
        model.getFollowings=getFollowings;
        model.getFollowers=getFollowers;
        model.removeFollowing=removeFollowing;
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