(function () {
    
   var app= angular.module("WDP")
       app.controller('profileCtrl',profileCtrl);

    function profileCtrl(isLoggedIn,UserService,$location) {



        var model = this;
        model.user= model.isLoggedIn=isLoggedIn;
        model.profilePic='';
        model.logout = logout;
        
        model.deleteUser=deleteUser;
        // model.findUserByEmail=findUserByEmail;
        model.logout=logout;
        model.updateUser=updateUser;
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

        

    }
})();