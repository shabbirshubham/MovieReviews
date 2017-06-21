
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
            this.checkLoggedin=checkLoggedin;
            this.updateUser=updateUser;
            this.createUser=createUser;

            function login(username,password) {
                var url = "/api/project/login";
                var credentials = {
                    username:username,
                    password:password
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
                var url = "/api/project/user/"+userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    },function (err) {
                        console.log(err);
                    })
            }
            
            function findUserByUsername(username) {
                var url = "/api/project/user?username="+username;
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
            
            function checkLoggedin() {
                var url = "/api/project/checkLoggedIn";
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updateUser(userId,user) {
                var url = "/api/project/user/"+userId;
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
        }
    }
    
)();