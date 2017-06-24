
(function () {
    angular
        .module("WDP")
        .controller('movieReviewCtrl',movieReviewCtrl);

    function movieReviewCtrl(MovieService,$location,$routeParams,$sce,isLoggedIn,UserService) {
        var model = this;
        model.isLoggedIn=isLoggedIn;
        model.movieId = $routeParams.movieId;
        model.getEmbedURL = getEmbedURL;
        model.getActorInfo = getActorInfo;
        model.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        // var configUrl = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://api.themoviedb.org/3/configuration?api_key="+API_KEY,
        //     "method": "GET",
        //     "headers": {},
        //     "data": "{}"
        // };
        // //
        // var moviedata = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+API_KEY+"&language=en-US",
        //     "method": "GET",
        //     "headers": {},
        //     "data": "{}"
        // };
        // //
        // var videoUrl = {
        //     "method": "GET",
        //     "url": "https://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key="+API_KEY+"&language=en-US",
        //     "headers": {},
        //     "data": "{}"
        // };
        // var creditUrl = {
        //     "method": "GET",
        //     "url": "https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key="+API_KEY,
        //     "headers": {},
        //     "data": "{}"
        // };
        // var reviewUrl = {
        //     "method": "GET",
        //     "url": "https://api.themoviedb.org/3/movie/"+movieId+"/reviews?page=1&language=en-US&api_key="+API_KEY,
        //     "headers": {},
        //     "data": "{}"
        // };

        function init() {
            MovieService
                .getVideo(model.movieId )
                .then(function (video) {
                    model.youtubeurl = "https://youtu.be/"+video.results[0].key;
                });

            MovieService
                .getConfig()
                .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                    MovieService
                        .getCredits(model.movieId )
                        .then(function (credits) {
                            var directors=[];
                            var writers = [];
                            var actors = [];
                            for(a in credits.cast){
                                if(actors.length>3)
                                    break;
                                else{
                                    credits.cast[a].profile_path = poster_config_path + credits.cast[a].profile_path;
                                    actors.push(credits.cast[a]);
                                }
                            }
                            for(c in credits.crew){
                                if(directors.length <3) {
                                    if (credits.crew[c].department === "Directing") {
                                        directors.push(credits.crew[c].name);
                                    }
                                }
                                if(writers.length<3) {
                                    if (credits.crew[c].department === "Writing") {
                                        writers.push(credits.crew[c].name);
                                    }
                                }
                                if(directors.length>=3 && writers.length>=3)
                                    break;
                            }
                            model.directors = directors;
                            model.actors = actors;
                            model.writers = writers;
                        });
                        MovieService
                            .getMovie(model.movieId )
                            .then(function (response) {
                                        model.movie = response;
                                        model.poster_path = poster_config_path + response.backdrop_path;
                                        model.title = response.original_title;
                                        arr = response.release_date.split("-");
                                        model.releaseyear = arr[0];
                                        model.releasedate = response.release_date;
                                        model.hour = parseInt(response.runtime/60);
                                        model.minutes = response.runtime - 60*model.hour;
                                        model.genres = response.genres;
                                        model.overview = response.overview;
                                        model.averagevote = response.vote_average;
                                        model.votes = response.vote_count;
                                        model.homepage = response.homepage;
                                        model.countries = response.production_countries;
                                        model.languages = response.spoken_languages;
                                        model.status = response.status;
                                        model.companies = response.production_companies;
                                        model.budget = moneyFormat(response.budget,'$');
                                        model.gross = moneyFormat(response.revenue,'$');
                                        model.tagline = response.tagline;
                            });
                    MovieService
                        .getSimilarMovies(model.movieId )
                        .then(function (movies) {
                            var movs = [];
                            for(m in movies.results){
                                if(movs.length>5)
                                    break;
                                var similarmoviepath = poster_config_path + movies.results[m].poster_path;
                                movies.results[m].poster_path = similarmoviepath;
                                movs.push(movies.results[m]);
                            }
                            model.similarmovies = movs;
                        });
                });
        }

        init();

        function moneyFormat(price, sign) {
            const pieces = parseFloat(price).toFixed(2).split('');
            var ii = pieces.length - 3;
            while ((ii-=3) > 0) {
                pieces.splice(ii, 0, ',')
            }
            return sign + pieces.join('')
        }

        function getActorInfo(actorId) {
            MovieService
                .getActorInfo(actorId)
                .then(function (actor) {
                    return actor.biography;
                });
        }

        function getEmbedURL(embedURL) {
            //var embedURL = "https://youtu.be/AM2Ivdi9c4E";
            var urlParts = embedURL.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

})();