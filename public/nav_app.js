// Create module
var navApp = angular.module('navApp', ['ngRoute', 'newsApp']);

// Configure routes
navApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'news/news.html',
		controller: 'newsController'
	});
});
