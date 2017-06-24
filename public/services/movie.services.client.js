
(function () {
        angular
            .module("WDP")
            .factory('MovieService',MovieService);

        function MovieService($http) {
            var API_KEY = "8b4a101400c25efdf094f6b9b8081675";
            var NY_API_KEY = "7e11f0c2bed84265a72a1b17de947ab7";

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
                getSortedGenreMovies:getSortedGenreMovies,
                getMovieIdBySearch:getMovieIdBySearch,
                getRecentMovies:getRecentMovies,
                getRecentMoviesByPageNumber:getRecentMoviesByPageNumber,
                getRecentSortedMoviesByPageNumber:getRecentSortedMoviesByPageNumber,
                getUpcomingMovies:getUpcomingMovies,
                getUpcomingMoviesByPageNumber:getUpcomingMoviesByPageNumber,
                getUpcomingSortedMoviesByPageNumber:getUpcomingSortedMoviesByPageNumber,
                getTopRatedMovies:getTopRatedMovies,
                getTopRatedMoviesByPageNumber:getTopRatedMoviesByPageNumber,
                getSortedTopRatedMoviesByPageNumber:getSortedTopRatedMoviesByPageNumber,
                getReviewsByMovieName:getReviewsByMovieName,
                getReviewsByMovieId:getReviewsByMovieId,
                getMoviesBySorting:getMoviesBySorting
            };

            return api;

            function getMoviesBySorting(sortBy,order) {
                var url = "https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+
                            "&language=en-US&sort_by="+sortBy+"."+order+"&include_adult=false&include_video=false&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getReviewsByMovieId(movieId) {
                var url  = "https://api.themoviedb.org/3/movie/"+movieId+"/reviews?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getReviewsByMovieName(query) {
                var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
                url += '?' + $.param({
                        'api-key': NY_API_KEY,
                        'query': query
                    });
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function getTopRatedMovies() {
                var url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+"&language=en-US&page=1";
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getSortedTopRatedMoviesByPageNumber(attr,order,pageNumber) {
                if(attr && order) {
                    var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_KEY +
                        "&language=en-US&include_adult=false&sort_by=" + attr + "." + order + "&page=" + pageNumber;
                }
                else {
                    if (attr) {
                        url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+attr+"&page="+pageNumber;
                    }
                    else if(order){
                        url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+order+"&page="+pageNumber;
                    }
                    else {
                        return getTopRatedMoviesByPageNumber(pageNumber);
                    }
                }
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getTopRatedMoviesByPageNumber(pageNumer) {
                var url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by=created_at.asc&page="+pageNumer;
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

            function getUpcomingMoviesByPageNumber(pageNumber) {
                var url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+API_KEY+
                    "&language=en-US&include_adult=false&sort_by=created_at.asc&page="+pageNumber;
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getUpcomingSortedMoviesByPageNumber(attr,order,pageNumber) {
                if(attr && order) {
                    var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY +
                        "&language=en-US&include_adult=false&sort_by=" + attr + "." + order + "&page=" + pageNumber;
                }
                else {
                    if (attr) {
                        url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+attr+"&page="+pageNumber;
                    }
                    else if(order){
                        url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+order+"&page="+pageNumber;
                    }
                    else {
                        return getUpcomingMoviesByPageNumber(pageNumber);
                    }
                }
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

            function getRecentSortedMoviesByPageNumber(attr,order,pageNumber) {
                if(attr && order) {
                    var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY +
                        "&language=en-US&include_adult=false&sort_by=" + attr + "." + order + "&page=" + pageNumber;
                }
                else {
                    if (attr) {
                        url = "https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+attr+"&page="+pageNumber;
                    }
                    else if(order){
                        url = "https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+order+"&page="+pageNumber;
                    }
                    else {
                        return getRecentMoviesByPageNumber(pageNumber);
                    }
                }
                return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getRecentMoviesByPageNumber(pageNumber) {
                var url = "https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+
                    "&language=en-US&include_adult=false&sort_by=created_at.asc&page="+pageNumber;
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

            function getSortedGenreMovies(attr,order,genreId) {
                if(attr && order) {
                    var url = "https://api.themoviedb.org/3/genre/"+genreId+"/movies?api_key=" + API_KEY +
                        "&language=en-US&include_adult=false&sort_by=" + attr + "." + order + "&page=1";
                }
                else {
                    if (attr) {
                        url = "https://api.themoviedb.org/3/genre/"+genreId+"/movies?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+attr+"&page=1";
                    }
                    else if(order){
                        url = "https://api.themoviedb.org/3/genre/"+genreId+"/movies?api_key="+API_KEY+
                            "&language=en-US&include_adult=false&sort_by="+order+"&page=1";
                    }
                    else {
                        return getMoviesByGenre(genreId);
                    }
                }
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
                        console.log(response);
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