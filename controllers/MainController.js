(function(){
	var app = angular.module('authApp');

	var MainController = function($scope, $location, authToken) {

		$scope.books = function() {
			$location.path("/books");
		}
		
		$scope.register = function() {
			console.log('inside maincontroller.register');
			//console.log($location.path('/foo'));
			$location.replace();
			$location.path("/register");

		};

		$scope.logout = function() {
			console.log('inside maincontroller.logout');
			//authToken.removeToken();
			//console.log($location.path('/foo'));
			$location.replace();
			$location.path("/logout");

		};

		$scope.login = function() {
			console.log('inside maincontroller.login');
			//console.log($location.path('/foo'));
			$location.replace();
			$location.path("/login");

		};

		$scope.isAuthenticated = function() {
			return authToken.isAuthenticated();
		}
	};

	app.controller('MainController', MainController);

}());