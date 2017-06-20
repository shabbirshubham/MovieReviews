
(function () {
        angular
            .module("WDP")
            .service('UserService',UserService);
        
        function UserService($http) {
            
            this.login=login;
            this.register=register;
            this.deleteUser=deleteUser;
            this.findUserByEmail=findUserByEmail;
            this.findUserByUsername=findUserByUsername;
            this.logout=logout;
            this.checkLoggedin=checkLoggedin;
            this.updateUser=updateUser;

            function login(username,password) {
                
            }
            
            function register(user) {
                
            }
            
            function deleteUser() {
                
            }
            
            function findUserByUsername(username) {
                
            }
            
            function logout() {
                
            }
            
            function checkLoggedin() {
                
            }
            function updateUser() {
                
            }
        }
    }
    
)();