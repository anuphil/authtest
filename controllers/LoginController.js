(function(){
	var app = angular.module('authApp');

	var LoginController = function($scope, $http, alert, $location, authToken) {
		console.log('inside Login controller');

		$scope.submit = function() {

			var user = {
				email: $scope.email,
				password: $scope.password
			};

			$http.post('http://localhost:3000/login', user)
				.success(function(res) {
					console.log('login good');
					alert('success', 'Welcome, thanks for coming back ', user.email);
					authToken.setToken(res.token);
					console.log('set token, now calling books');
					$location.path("/books");
				})
				.error(function(err) {
					console.log('login bad');
					alert('warning', 'Something went wrong', err.message);
				});
		};
	};

	app.controller('LoginController', LoginController);

}());