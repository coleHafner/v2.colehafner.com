angular.module('cjh')

.directive('appNav', [function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'nav.html',
		controller: ['$scope', '$window', '$state', function ($scope, $window, $state) {

			$scope.activate = function($event, item) {
				$scope.selected = item;
				$state.go(item);
				//$('a.active')[0].style.transform = 'translateX(' + ($event.clientX - 25) + 'px)';
			};

			$scope.selected = 'home';

			$scope.$root.$on('$stateChangeSuccess', function ($event, toState, toParams, fromState, fromParams) {
				var newTitle = 'colehafner.com - ' + toState.name;
				$window.document.title = newTitle;
				$scope.selected = toState.name;
			});
		}]
	};
}]);