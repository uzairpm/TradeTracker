var myApp = angular.module('myApp');

myApp.controller('homeCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.project = {};
  $scope.project.url = "http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=5&additionalType=2&limit=10";

  $scope.save = function() {
    localStorage.url = $scope.project.url;
    $location.path("result");
  }
}]);
