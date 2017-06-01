(function(){
	var app = angular.module('authApp');

	var RegisterController = function($scope, $http, alert, authToken) {
		console.log('inside register controller');

		$scope.submit = function() {
			console.log('inside registercontroller submit');
			
			var url = 'http://localhost:3000/register';
			var user = {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password
			};

			$http.post(url, user)
				.success(function(res){
					console.log('good');
					alert('success', 'Account registered!', '   Welcome ' + res.user.name + '!');
					authToken.setToken(res.token);
					console.log('set token:');
					console.log(res.token);
				})
				.error(function(err) {
					console.log('bad');
					alert('warning', 'Opps', '  Could not register');
				});
		};
	};

	app.controller('RegisterController', RegisterController);

}());