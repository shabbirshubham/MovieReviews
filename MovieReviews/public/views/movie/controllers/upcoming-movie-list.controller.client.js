(
    function () {
        angular
            .module("WDP")
            .controller('upcomingmovieListCtrl', upcomingmovieListCtrl);

        function upcomingmovieListCtrl(MovieService, $location, $routeParams, $sce) {
            var model = this;
            model.pagination = pagination;

            function init() {

                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getUpcomingMovies()
                            .then(function (response) {
                                for(m in response.results){
                                    var movie = response.results[m];
                                    model.movieId = movie.id;
                                    var path = poster_config_path + movie.poster_path;
                                    movie.poster_path = path;
                                    arr = movie.release_date.split("-");
                                    movie.release_date = arr[0];
                                    MovieService
                                        .getCredits(model.movieId)
                                        .then(function (credits) {
                                            var directors=[];
                                            var actors = [];
                                            for(a in credits.cast){
                                                if(actors.length>3)
                                                    break;
                                                else{
                                                    actors.push(credits.cast[a]);
                                                }
                                            }
                                            for(c in credits.crew){
                                                if(directors.length >2) {
                                                    break;
                                                }
                                                else{
                                                    if (credits.crew[c].department === "Directing") {
                                                        directors.push(credits.crew[c].name);
                                                    }
                                                }
                                            }
                                            model.directors = directors;
                                            model.actors = actors;
                                        });
                                }
                                model.movies = response.results;
                            });
                    });
            }
            init();

            function pagination(pageNumber) {
                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getMoviesByPageNumber(pageNumber,model.genreId)
                            .then(function (response) {
                                model.pagenumber = (pageNumber-1)*10;
                                for(m in response.results){
                                    var movie = response.results[m];
                                    model.movieId = movie.id;
                                    var path = poster_config_path + movie.poster_path;
                                    movie.poster_path = path;
                                    arr = movie.release_date.split("-");
                                    movie.release_date = arr[0];
                                    MovieService
                                        .getCredits(model.movieId)
                                        .then(function (credits) {
                                            var directors=[];
                                            var actors = [];
                                            for(a in credits.cast){
                                                if(actors.length>3)
                                                    break;
                                                else{
                                                    actors.push(credits.cast[a]);
                                                }
                                            }
                                            for(c in credits.crew){
                                                if(directors.length >2) {
                                                    break;
                                                }
                                                else{
                                                    if (credits.crew[c].department === "Directing") {
                                                        directors.push(credits.crew[c].name);
                                                    }
                                                }
                                            }
                                            model.directors = directors;
                                            model.actors = actors;
                                        });
                                }
                                model.movies = response.results;
                            });
                    });
            }
        }
    }
)();