
(function () {
    var app = angular.module("WDP");
    app.config(configuration);

    function configuration($routeProvider) {
         $routeProvider
            .when('/',{
                templateUrl:'views/home/templates/home2.view.client.html',
                controller:'homeCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
            .when('/home',{
                templateUrl:'views/home/templates/home2.view.client.html',
                controller:'homeCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
             .when('/movie/genre/:genreId',{
                 templateUrl:'views/movie/templates/movie-genre-list.view.client.html',
                 controller:'movieGenreCtrl',
                 controllerAs:'model',
                 resolve: { isLoggedIn: checkLoggedIn }
             })
            .when('/movie/:movieId',{
                templateUrl:'views/movie/templates/movie-review.view.client.html',
                controller:'movieReviewCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
            .when('/theatremovie',{
                templateUrl:'views/movie/templates/theatre-movie-list.view.client.html',
                controller:'theatremovieListCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
             .when('/coming-soon',{
                 templateUrl:'views/movie/templates/upcoming-movie-list.view.client.html',
                 controller:'upcomingmovieListCtrl',
                 controllerAs:'model',
                 resolve: { isLoggedIn: checkLoggedIn }
             })
             .when('/top-rated',{
                 templateUrl:'views/movie/templates/top-rated-movie-list.view.client.html',
                 controller:'topratedmovieListCtrl',
                 controllerAs:'model',
                 resolve: { isLoggedIn: checkLoggedIn }
             })
            .when('/contactUs',{
                templateUrl:'views/contact/templates/contact.view.client.html'
            })
            .when('/aboutUs',{
                templateUrl:'views/home/templates/about.view.client.html'
            })
            .when('/joinUs',{
                templateUrl:'views/home/templates/joinus.view.client.html'
            })
            .when('/news/top_news',{
                templateUrl:'views/news/templates/topNews.view.client.html',
                controller:'topNewsCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
             .when('/news/latest_reviews',{
                 templateUrl:'views/news/templates/latestReviews.view.client.html',
                 controller:'latestReviewCtrl',
                 controllerAs:'model',
                 resolve: { isLoggedIn: checkLoggedIn }
             })
            .when('/news/talking_points',{
                templateUrl:'views/news/templates/talkingPoints.view.client.html',
                controller:'talkingPointsCtrl',
                controllerAs:'model',
                resolve: { isLoggedIn: checkLoggedIn }
            })
        //    User Congig Settings
             .when('/profile',{
                 templateUrl: 'views/user/templates/profile.view.client.html',
                 controller: 'profileCtrl',
                 controllerAs:"model",
                 resolve: { isLoggedIn: checkLoggedIn }
             })
             .when('/login',{
                 templateUrl:'views/user/templates/login.view.client.html',
                controller: 'loginCtrl',
                 controllerAs:'model'
             })

        }


        function checkLoggedIn($q, $timeout, $http, $location, $rootScope,UserService) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(function (user) {

                    if(user==='0'){
                        deferred.resolve({});
                        //$location.url('/');
                    }else{
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }

    }
)();