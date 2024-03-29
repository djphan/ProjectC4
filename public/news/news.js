c4App.controller('newsController', function($scope, $http) {
  $scope.isBusy = true;

  // Clear articles
  $scope.articles = [];

  $http.get("data/news")
  .then(function(result) {
    // Success
    angular.copy(result.data, $scope.articles);
  }, function() {
    // Error
    // TODO: Improve error handling
    alert("Could not load news articles :(");
  }).then(function() {
    // Initialize Skrollr

    $scope.isBusy = false;
  });
});
