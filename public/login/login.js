var loginApp = angular.module('loginApp', []);


newsApp.controller('newsController', function($scope, $http) {
  $scope.isBusy = true;

  // Clear articles
  $scope.user = []

  $http.get("data/users", { username: "lolkats91" })
  .then(function(result) {
    // Success
    angular.copy(result.data, $scope.user);
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
});
