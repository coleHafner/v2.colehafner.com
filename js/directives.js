angular.module('cjh')

.directive('appNav', [function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'nav.html',
		link: function(scope, el, attrs, ctrl) {
			scope.el = el;
		},
		controller: [
			'$scope', 
			'$window', 
			'$state', 
			'$interval',
		function (
			$scope, 
			$window, 
			$state,
			$interval
		) {
			$scope.selected = 'home';
			$scope.state = null;

			$scope.activate = function($event, item) {
				$scope.selected = item;
				
				$state.go(item).then(function(r) {
					onItemClick();
				});
			};
			
			$scope.openBlog = function() {
				$window.open('http://colescodeco.tumblr.com', '_blank');
				onItemClick();
			};
			
			$scope.toggle = function() {
				$scope.state = doToggle();
			};
			
			$scope.$root.$on('$stateChangeSuccess', function ($event, toState, toParams, fromState, fromParams) {
				var newTitle = toState.name.charAt(0).toUpperCase() + toState.name.substr(1) + ' - colehafner.com';
				$window.document.title = newTitle;
				$scope.selected = toState.name;
			});
			
			$scope.$on('$destroy', function() {
				$interval.cancel(checkResize);
			});
			
			
			
			angular.element($window).bind('resize', function() {
				var navItems = angular.element($scope.el.children('.inner')).children('ul'),
					newDisplay = ($window.innerWidth > 800) ? 'block' : 'none';
					
				navItems.css('display', newDisplay);
			});
			
			function onItemClick() {
				var tab = $scope.el.children('.toggle');
				
				if (!tab || tab.css('display') !== 'block') {
					return;
				}

				doToggle();
			}
			
			function doToggle() {
				var navItems = angular.element($scope.el.children('.inner')).children('ul'),
					currentDisplay = navItems.css('display'),
					newDisplay = currentDisplay === 'block' ? 'none' : 'block';
			
				navItems.css('display', newDisplay);
			}
		}]
	};
}]);