(function () {
    angular.module("WDP").service('NewsService',NewsService);

    function NewsService($http) {

        this.getTopNews = getTopNews;
        this.getLatestReviews=getLatestReviews;
        this.getTalkingPoints=getTalkingPoints;
        var API_KEY='d5457e48-805f-4353-aca6-32df568fab15';

        function getTopNews() {
            var url ='https://content.guardianapis.com/search?&format=json&tag=film/film,tone/news&show-fields=trailText,byline,thumbnail,shortUrl&from-date=2017-06-01&&order-by=newest&api-key='+API_KEY;

           return $http
                .get(url)
                .then(function (response) {
                    return response.data.response.results;
                })
        }

        function getLatestReviews() {
            var url ='https://content.guardianapis.com/search?&format=json&tag=film/film,tone/reviews&show-fields=trailText,byline,thumbnail,shortUrl,starRating,publication&from-date=2017-06-01&&order-by=newest&api-key='+API_KEY;

          return  $http
                .get(url)
                .then(function (response) {
                    return response.data.response.results;
                })
        }

        function getTalkingPoints() {
            var url ='https://content.guardianapis.com/search?&format=json&tag=film/filmblog&show-fields=all&from-date=2017-06-01&&order-by=newest&api-key='+API_KEY;

            return $http
                .get(url)
                .then(function (response) {
                    return response.data.response.results;
                })
        }


    }
})();