(function () {
    
    angular.module('WDP')
        .controller('latestReviewCtrl',latestReviewCtrl);
    
    function latestReviewCtrl($scope,$http,isLoggedIn,UserService,$location,$window) {

        var model = this;
        model.isLoggedIn=isLoggedIn;
        model.logout = logout;
        model.redirectTo=redirectTo;
        function redirectTo(url) {
            $window.open(url);
        }
        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        //var url ='http://newsapi.org/v1/articles?source=techcrunch&apiKey=e652550722294cb5b5ef87e76ae5e2f3';
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

        // function getAllNews() {
        //    return
        // }

    }
})();