(
    function () {

        angular.module("WDP").controller('loginCtrl',loginCtrl);

        function loginCtrl(UserService,$location) {
            
            var model = this;
            //model.isLoggedIn=isLoggedIn;
            model.login=login;
            model.register = register;


            function login(uname,pwd){

                //var found = UserService.findUserByCredentials(uname,pwd);
                //UserService.findUserByCredentials(uname,pwd)
                UserService.login(uname,pwd)
                    .then(function (found) {
                        if(found!==null){
                            $location.url('/profile');
                        }
                        else{
                            model.error='User not found';
                        }
                    },function (err) {
                        model.error="User Not Found"
                    });


            }

            function register(username,email,password,verifyPassword){

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
                                    password: password,
                                    email:email,
                                    role:'critic'
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