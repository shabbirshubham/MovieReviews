
(function () {
    angular
        .module("WDP")
        .controller('movieReviewCtrl',movieReviewCtrl);

    function movieReviewCtrl(MovieService,$location,$routeParams,$sce) {
        var model = this;
        // model.movieId = $routeParams.movieId;
        var API_KEY = "8b4a101400c25efdf094f6b9b8081675";
        var movieId = 297761;
        model.getEmbedURL = getEmbedURL;

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
                .getVideo(movieId)
                .then(function (video) {
                    model.youtubeurl = video.results[0].key;
                });


            MovieService
                .getCredits(movieId)
                .then(function (credits) {
                        var directors=[];
                        var writers = [];
                        var actors = [];
                        for(a in credits.cast){
                            if(actors.length>3)
                                break;
                            else{
                                actors.push(credits.cast[a].name);
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
                .getConfig()
                .then(function (configs) {
                        var baseURL = configs.images.secure_base_url+"";
                        var size = configs.images.profile_sizes[2];
                        var poster_config_path = baseURL + size;
                        MovieService
                            .getMovie(movieId)
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
                            });
                });

            // $.ajax(reviewUrl).done(function (review) {
            //     var reviews = [];
            //     for(m in review.results){
            //         if(reviews.length<10){
            //             reviews.push(review.results[m]);
            //         }
            //     }
            //     model.reviews = reviews;
            // });
            //
            // $.ajax(videoUrl).done(function (video){
            //     model.youtubeurl = video.results[0].key;
            // });
            //
            // $.ajax(creditUrl).done(function (credits) {
            //     var directors=[];
            //     var writers = [];
            //     var actors = [];
            //     for(a in credits.cast){
            //         if(actors.length>3)
            //             break;
            //         else{
            //             actors.push(credits.cast[a].name);
            //         }
            //     }
            //     for(c in credits.crew){
            //         if(directors.length <3) {
            //             if (credits.crew[c].department === "Directing") {
            //                 directors.push(credits.crew[c].name);
            //             }
            //         }
            //         if(writers.length<3) {
            //             if (credits.crew[c].department === "Writing") {
            //                 writers.push(credits.crew[c].name);
            //             }
            //         }
            //         if(directors.length>=3 && writers.length>=3)
            //             break;
            //     }
            //     model.directors = directors;
            //     model.actors = actors;
            //     model.writers = writers;
            // });
            //
            // //
            // $.ajax(configUrl).done(function (configs) {
            //     var baseURL = configs.images.secure_base_url+"";
            //     var size = configs.images.profile_sizes[2];
            //     var poster_config_path = baseURL + size;
            //     $.ajax(moviedata).done(function (response) {
            //         model.movie = response;
            //         model.poster_path = poster_config_path + response.backdrop_path;
            //         model.title = response.original_title;
            //         arr = response.release_date.split("-");
            //         model.releaseyear = arr[0];
            //         model.releasedate = response.release_date;
            //         model.hour = parseInt(response.runtime/60);
            //         model.minutes = response.runtime - 60*model.hour;
            //         model.genres = response.genres;
            //         model.overview = response.overview;
            //         model.averagevote = response.vote_average;
            //         model.votes = response.vote_count;
            //         model.homepage = response.homepage;
            //     });
            // });
        }

        init();

        function getEmbedURL(embedURL) {
            //var embedURL = "https://youtu.be/AM2Ivdi9c4E";
            var urlParts = embedURL.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

})();