
(function () {
    var app = angular.module("WDP");
    app.config(configuration);

    function configuration($routeProvider) {
         $routeProvider
        //     .when('/',{
        //         templateUrl:'views/home/templates/home.view.client.html'
        //     })
            .when('/home',{
                templateUrl:'views/home/templates/home.view.client.html'
            })
             .when('/home2',{
                 templateUrl:'views/home/templates/home2.view.client.html'
             })

            

            .when('/inTheatre',{
                templateUrl:'views/movie/templates/movie-review.view.client.html',
                controller:'movieReviewCtrl',
                controllerAs:'model'
            })
            .when('/movie_list',{
                templateUrl:'views/movie/templates/movie-list.view.client.html',
                controller:'movieListCtrl',
                controllerAs:'model'
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
            .when('/news',{
                templateUrl:'views/news/templates/news.view.client.html',
                controller:'newsCtrl',
                controllerAs:'model'
            })
    }



    }
)();