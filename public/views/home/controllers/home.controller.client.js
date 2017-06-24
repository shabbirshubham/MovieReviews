(function () {
    angular
        .module('WDP')
        .controller('homeCtrl',homeCtrl);
    
    function homeCtrl($routeParams,UserService,$location,MovieService,isLoggedIn,$http) {
        var model = this;
        model.isLoggedIn=isLoggedIn;
        model.search = search;
        model.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        var url ='http://content.guardianapis.com/search?&format=json&tag=film/film,tone/reviews&show-fields=trailText,byline,thumbnail,shortUrl,starRating,publication&from-date=2017-06-01&&order-by=newest&api-key=d5457e48-805f-4353-aca6-32df568fab15';
        function init() {
            $http
                .get(url)
                .then(function (response) {
                    console.log(response);
                    //model.allNews=response.data.articles;
                    model.newsReviews = response.data.response.results;

                    //model.allNews.webPublicationDate = model.allNews.webPublicationDate.toUTCString();
                })

        }init();

        function search(query) {
        }
    }
})();