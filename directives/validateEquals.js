var app = angular.module('authApp');

app.directive('validateEquals', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.validateEquals;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('validateEquals', v);
          });
        });
      }
    }
  }]);

//this did not work, not sure yet why. was in the pluralsight tutorial
/*
app.directive('validateEquals', [function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			function validateEqual(value) {
				var valid = (value === scope.$eval(attrs.validateEquals));
				ngModelCtrl.$setValidity('equal', valid);
				return valid ? value : undefined;
			}
			ngModelCtrl.$parsers.push(validateEqual);
			ngModelCtrl.$formatters.push(validateEqual);

			console.log('anu here: ' + ngModelCtrl.$viewValue);

			scope.$watch(attrs.validateEquals, function(){
				ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
			})
		}
	};
}]);
*/