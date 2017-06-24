(function () {

    angular.module("WDP").directive('fileInput', ['$parse','$http',function ($parse,$http) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.bind('change', function (event) {
                    // $parse(attributes.fileInput)
                    //     .assign(scope,element[0].files);
                    var fetchFile = event.target.files[0];
                    scope.$apply();
                    var url="api/project/uploadProfileImage";
                    return   $http.post(url,event.target.files);
                });
            }
        };
    }]);
})();