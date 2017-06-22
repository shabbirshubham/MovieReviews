
(function () {
        angular
            .module("WDP")
            .factory('MovieService',MovieService);

        function MovieService($http) {
            var API_KEY = "8b4a101400c25efdf094f6b9b8081675";

            var api = {
                getConfig:getConfig,
                getMovie:getMovie,
                getVideo:getVideo,
                getCredits:getCredits,
                getActorInfo:getActorInfo,
                getSimilarMovies:getSimilarMovies,
                getGenres:getGenres,
                getMoviesByGenre:getMoviesByGenre,
                getMoviesByPageNumber:getMoviesByPageNumber,
                getMovieIdBySearch:getMovieIdBySearch,
                getRecentMovies:getRecentMovies,
                getUpcomingMovies:getUpcomingMovies,
                getTopRatedMovies:getTopRatedMovies
            };

            return api;

            function getTopRatedMovies() {
                var url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getUpcomingMovies() {
                var url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            function getRecentMovies() {
                var url = "https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getMovieIdBySearch(query) {
                var url = "https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+
                            "&language=en-US&query="+query+"&page=1&include_adult=false";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getMoviesByPageNumber(pageNumer,genreId) {
                var url = "https://api.themoviedb.org/3/genre/"+genreId+"/movies?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by=created_at.asc&page="+pageNumer;
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getMoviesByGenre(genreId) {
                var url = "https://api.themoviedb.org/3/genre/"+genreId+"/movies?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by=created_at.asc";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getGenres() {
                var url = "https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getSimilarMovies(movieId) {
                var url = "https://api.themoviedb.org/3/movie/"+movieId+"/similar?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getActorInfo(actorId) {
                var url = "https://api.themoviedb.org/3/person/"+actorId+
                            "?api_key="+API_KEY+"&language=en-US";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getCredits(movieId) {
                var url = "https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key="+API_KEY;
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getVideo(movieId) {
                var url = "https://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key="+API_KEY+"&language=en-US";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getMovie(movieId) {
                var url = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+API_KEY+"&language=en-US";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getConfig() {
                var url =  "https://api.themoviedb.org/3/configuration?api_key="+API_KEY;
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

        }
    }

)();