(function(){
	var app = angular.module('authApp', ['ngRoute']);
	app.config(function($routeProvider, $httpProvider){
		$routeProvider.when('/books',
		{
			templateUrl:'/build/books.html',
			controller:'BooksController'
		})
		$routeProvider.when('/register',
		{
			templateUrl:'/build/register.html',
			controller:'RegisterController'
		})
		$routeProvider.when('/logout',
		{
			template: 'You have been logged out',
			//templateUrl: '/build/index.html',
			controller:'LogoutController'
		})
		$routeProvider.when('/login',
		{
			templateUrl:'/build/login.html',
			controller:'LoginController'
		})
		$httpProvider.interceptors.push('authInterceptor');
	});
}());
