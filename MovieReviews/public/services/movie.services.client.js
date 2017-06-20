
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
                getCredits:getCredits
            };

            return api;

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