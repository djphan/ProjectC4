// Create module
var navApp = angular.module('navApp', ['ngRoute', 'newsApp', 'loginApp']);

// Configure routes
navApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'news/news.html',
    controller: 'newsController'
  })
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginController'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html'
  });
});
