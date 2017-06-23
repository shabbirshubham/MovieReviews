(
    function () {
        angular
            .module("WDP")
            .controller('movieGenreCtrl', movieGenreCtrl);

        function movieGenreCtrl(MovieService, $location, $routeParams, $sce) {
            var model = this;
            model.genreId = $routeParams.genreId;
            model.pagination = pagination;
            model.search = search;

            function init() {

                MovieService
                    .getGenres()
                    .then(function (response) {
                        model.genre = "";
                        for(g in response.genres){
                            var genre = response.genres[g];
                            if(genre.id === parseInt(model.genreId)){
                                model.genre = genre.name;
                                break;
                            }
                        }
                    });

                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getMoviesByGenre(model.genreId)
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


            function searchSortedMoviesByPageNumber(attr,order,pageNumber) {
                MovieService
                    .getConfig()
                    .then(function (configs) {
                        var baseURL = configs.images.secure_base_url + "";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getSortedGenreMovies(attr, order, model.genreId)
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
                        if((model.attribute === "" || model.attribute === undefined)
                            && (model.order === undefined || model.order === "")) {
                            MovieService
                                .getMoviesByPageNumber(pageNumber, model.genreId)
                                .then(function (response) {
                                    getMovieInfo(response, poster_config_path, pageNumber);
                                });
                        }
                        else{
                            searchSortedMoviesByPageNumber(model.attribute,model.order,pageNumber);
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