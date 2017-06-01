
	var app = angular.module('authApp');

	var LogoutController = function(authToken) {
		console.log('inside logout controller');

		authToken.removeToken();

		console.log('done calling removeToken()');
		
	};

	app.controller('LogoutController', LogoutController);

