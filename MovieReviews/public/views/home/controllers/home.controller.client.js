(function () {
    angular
        .module('WDP')
        .controller('homeCtrl',homeCtrl);
    
    function homeCtrl($routeParams,UserService,$location,MovieService) {
        var model = this;
        model.login = login;
        model.search = search;

        function login(username,password) {
            // var found = userService.findUserByCredentials(username,password);

            if(username === undefined || password === undefined) {
                if (username === undefined) {
                    model.usernamealert = true;
                    model.error = true;
                }
                else{
                    model.usernamealert = false;
                }
                if (password === undefined) {
                    model.passwordalert = true;
                    model.error = true;
                }
                else{
                    model.passwordalert = false;
                }
                model.message = false;
                return;
            }

            model.usernamealert = false;
            model.passwordalert = false;

            UserService
                .login(username,password)
                .then(function (user) {
                    if(user!="" || user!=null) {
                        model.error = false;
                        model.message = false;
                        $location.url('/home/user');
                    }
                },function (err) {
                    model.error = true;
                    model.message = "Invalid credentials";
                });
        }

        function search(query) {
        }
    }
})();