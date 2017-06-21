(function () {
    
    angular.module('WDP')
        .controller('topNewsCtrl',topNewsCtrl);
    
    function topNewsCtrl($http) {

        var model = this;

        //var url ='http://newsapi.org/v1/articles?source=techcrunch&apiKey=e652550722294cb5b5ef87e76ae5e2f3';
        var url ='http://content.guardianapis.com/search?&format=json&tag=film/film,tone/news&show-fields=trailText,byline,thumbnail,shortUrl&from-date=2017-06-01&&order-by=newest&api-key=d5457e48-805f-4353-aca6-32df568fab15';
        function init() {
            $http
                .get(url)
                .then(function (response) {
                    console.log(response);
                    //model.allNews=response.data.articles;
                    model.allNews = response.data.response.results;
                    //model.allNews.webPublicationDate = model.allNews.webPublicationDate.toUTCString();
                })

        }init();

        // function getAllNews() {
        //    return
        // }

    }
})();