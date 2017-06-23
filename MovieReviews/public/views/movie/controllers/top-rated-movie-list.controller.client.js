(
    function () {
        angular
            .module("WDP")
            .controller('topratedmovieListCtrl', topratedmovieListCtrl);

        function topratedmovieListCtrl(MovieService, $location, $routeParams, $sce) {
            var model = this;
            model.pagination = pagination;
            model.search = search;

            function init() {

                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getTopRatedMovies()
                            .then(function (response) {
                                getMovieInfo(response,poster_config_path);
                            });
                    });
            }
            init();

            function search(attr,order) {
                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url + "";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getMoviesBySorting(attr, order)
                            .then(function (response) {
                                getMovieInfo(response,poster_config_path);
                            });
                    });
            }
            
            function searchSortedMoviesByPageNumber(attr,order,pagenumber) {
                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url + "";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getSortedTopRatedMoviesByPageNumber(attr, order, pagenumber)
                            .then(function (response) {
                                getMovieInfo(response,poster_config_path);
                            });
                    });
            }

            function pagination(pageNumber) {
                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        if(model.attribute === "" || model.attribute === undefined
                            || model.order === undefined || model.attribute === "") {
                            MovieService
                                .getTopRatedMoviesByPageNumber(pageNumber)
                                .then(function (response) {
                                    getMovieInfo(response,poster_config_path,pageNumber);
                                });
                        }else{
                            searchSortedMoviesByPageNumber(model.attribute,model.order,pagenumber);
                        }
                    });
            }

            function getMovieInfo(response,poster_config_path,pageNumber){
                model.pagenumber = (pageNumber-1)*10;
                for(m in response.results){
                    var movie = response.results[m];
                    model.movieId = movie.id;
                    var path = poster_config_path + movie.poster_path;
                    movie.poster_path = path;
                    arr = movie.release_date.split("-");
                    movie.release_date = arr[0];
                    // MovieService
                    //     .getCredits(model.movieId)
                    //     .then(function (credits) {
                    //         var directors=[];
                    //         var actors = [];
                    //         for(a in credits.cast){
                    //             if(actors.length>3)
                    //                 break;
                    //             else{
                    //                 actors.push(credits.cast[a]);
                    //             }
                    //         }
                    //         for(c in credits.crew){
                    //             if(directors.length >2) {
                    //                 break;
                    //             }
                    //             else{
                    //                 if (credits.crew[c].department === "Directing") {
                    //                     directors.push(credits.crew[c].name);
                    //                 }
                    //             }
                    //         }
                    //         model.directors = directors;
                    //         model.actors = actors;
                    //     });
                }
                model.movies = response.results;
            }
        }
    }
)();