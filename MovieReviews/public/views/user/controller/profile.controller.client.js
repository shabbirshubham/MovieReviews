(function () {
    
    angular.module("WDP").controller('profileCtrl',profileCtrl);
    
    function profileCtrl(isLoggedIn,UserService,$location) {

        var model = this;
        model.isLoggedIn=isLoggedIn;
        model.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();