var myApp = angular.module('myApp');

myApp.controller('resultCtrl',['$scope', '$window', function($scope, $window) {
  $("#loading").show();

  var socket = io.connect('http://localhost');
  socket.on('hello', function (data) {
    console.info("Sockets connected");
    console.log(data);
    socket.emit('url', { url: localStorage.url });
  });

  socket.on('error', function(data) {
    alert(data);
  });

  var htmlTemplate = $('#product-template2').html();
  socket.on('productParsed', function(data) {
    
    var obj = data.productData;
    template = ejs.render(htmlTemplate, obj, {});

    $("#loading").hide();
    $(template).hide().appendTo("#rowId").fadeIn(1000);
  });

  $scope.goBack = function() {
    $window.history.back();
  }
}]);
