var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'textAngular', 'ngFileUpload', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //create
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: './templates/pages/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .state("otherwise", {
            url: "*path",
            templateUrl: './dashboard.html',
            controller: 'dashboardController',
            controllerAs: 'vm'
        });

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
});

watchStateChanges.$inject = ['$rootScope', '$location', '$window', '$http'];
app.run(watchStateChanges);

function watchStateChanges($rootScope, $location, $window, $http) {
    $http.get('./env.json').then(function (data) {
        $window.localStorage.setItem("host", data.data[0]["host"]);
    });
}

app.controller('CommonCtrl', ['$scope', '$window', '$timeout', '$mdSidenav', 'S3UploadService', 'Upload', '$location', '$rootScope', '$mdToast',
    function ($scope, $window, $timeout, $mdSidenav, S3UploadService, Upload, $location, $rootScope, $mdToast) {
        var vm = $scope;

    }
]);
