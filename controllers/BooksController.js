angular.module('authApp').controller('BooksController', function($scope, $http, alert){
	console.log('inside books controller');
	//$scope.books = ['hey hey', 'ho ho'];
	$http.get('http://localhost:3000/books')
		.success(function(res) {
			console.log('success');
			$scope.books = res;
		})
		.error(function(err) {
			console.log('going to call alert');
			alert('warning', 'Unable to get books ', 'You are not authorized');
			console.log('error');
		});
});