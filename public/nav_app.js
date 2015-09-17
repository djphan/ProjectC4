// Create module
var navApp = angular.module('navApp', ['ngRoute', 'newsApp']);

// Configure routes
navApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl:'news/news.html'
  })
  .when('/news', {
    templateUrl: 'news/news.html'
  })
  .when('/login', {
    templateUrl: 'login/login.html'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html'
  });
})

.controller('NavController', ['$scope', function($scope) {
    // TODO login check logic
    $scope.isLoggedIn = false;

}]);
