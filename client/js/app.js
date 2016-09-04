var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/result', {
      controller: 'resultCtrl',
      templateUrl: 'template/result.html'
    })
    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'template/home.html'
    })
}]);
