(
    function () {

        angular.module("WDP").controller('loginCtrl',loginCtrl);

        function loginCtrl(UserService) {
            
            var model = this;
            model.showLoginModal=showLoginModal;
            model.login=login;
            model.register = register;
            model.val=10;
            function showLoginModal() {
                console.log("BLAAAAAAAAAAAA")
                ModalService.showModal({
                    templateUrl: "./login.controller.client.js",
                    controller: "YesNoController"
                }).then(function(modal) {
                    // The modal object has the element built, if this is a bootstrap modal
                    // you can call 'modal' to show it, if it's a custom modal just show or hide
                    // it as you need to.
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = result ? "You said Yes" : "You said No";
                    });
                });
            }

            function login(uname,pwd){

                //var found = UserService.findUserByCredentials(uname,pwd);
                //UserService.findUserByCredentials(uname,pwd)
                UserService.login(uname,pwd)
                    .then(function (found) {
                        if(found!==null){
                            $location.url('/profile');
                        }
                        else{
                            model.message='User not found';
                        }
                    },function (err) {
                        model.message="User Not Found"
                    });


            }

            function register(username,password,verifyPassword){

                if(password === null || typeof password==='undefined'||
                    verifyPassword === null || typeof verifyPassword==='undefined'
                    || username === null || typeof username==='undefined'){
                    model.error="All fields are required";
                    return;
                }
                if(password!==verifyPassword ){
                    model.error="Password doesnot match";
                    return;
                }

                UserService.findUserByUsername(username)
                    .then(
                        function (user) {
                            if(user)
                            {
                                model.error = "sorry, username already taken.";
                            }
                            else{
                                var newUser={
                                    username:username,
                                    password: password
                                };
                                return UserService
                                    .register(newUser)
                                    .then(function (user) {
                                        $location.url("/home")
                                    });
                            }

                        },
                        function(){
                        })



            }
        }   
    }
)();