// Create module
var c4App = angular.module('c4App', ['ngRoute']);

// Configure routes
c4App.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'news/news.html',
    controller: 'newsController'
  })
  .when('/login', {
    templateUrl: 'login/login.html'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html'
  });
});
