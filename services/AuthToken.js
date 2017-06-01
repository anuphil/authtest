var app = angular.module('authApp');

app.factory('authToken', function($window){
	var storage = $window.localStorage;
	var cachedToken;
	var userToken = 'userToken';

	var authToken = {
		setToken: function(token) {
			cachedToken = token;
			storage.setItem(userToken, token);
		},
		getToken: function() {
			if (!cachedToken)
				cachedToken = storage.getItem(userToken);
			console.log('returning token');
			return cachedToken;
		},
		isAuthenticated: function() {
			return !!authToken.getToken(); //returns true if we get something from getToken()
		},
		removeToken: function() {
			console.log('inside remove token');
			cachedToken = null;
			storage.removeItem(userToken);
			console.log('removed token');
		}
	};

	return authToken;
});