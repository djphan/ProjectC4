// Create module
var navApp = angular.module('navApp', ['ngRoute', 'newsApp']);

// Configure routes
navApp.config(function($routeProvider) {
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
