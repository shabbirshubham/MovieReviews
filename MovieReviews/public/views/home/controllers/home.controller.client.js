(function () {
    angular
        .module('WDP')
        .controller('homeCtrl',homeCtrl);
    
    function homeCtrl($routeParams,UserService,$location,MovieService) {
        var model = this;
        model.searchMovie = searchMovie;

        function searchMovie(query) {
            $location.url('/search/'+query);
        }
    }
})();