var loginApp = angular.module('loginApp', []);

loginApp.controller('loginController', function($scope, $http) {
  $scope.isBusy = true;

  // Clear articles
  $scope.user = {};
  $scope.clicker = function() {
    console.log("Yay!");
  }

  $scope.login = function (user) {
    $http.post("/login", $scope.user)
    .then(function(result) {
      // Success
      console.log(result.data);

    }, function() {
      // Error
      // TODO: Improve error handling
      alert("Could not grab Users");
    }).then(function() {
      // Initialize Skrollr
      skrollr.init({
        forceHeight: false
      });
      $scope.isBusy = false;
    });
  }

});
