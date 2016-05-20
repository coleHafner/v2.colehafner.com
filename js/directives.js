angular.module('cjh')

.directive('appNav', [function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'nav.html',
		link: function(scope, el, attrs, ctrl) {
			scope.el = el;
		},
		controller: ['$scope', '$window', '$state', function ($scope, $window, $state) {

			$scope.selected = 'home';

			$scope.activate = function($event, item) {
				$scope.selected = item;
				
				$state.go(item).then(function(r) {
					onItemClick();
				});
			};
			
			$scope.toggle = function() {
				var classToAdd = $scope.el.hasClass('visible') ? 'hidden' : 'visible';
				$scope.el.removeClass('visible hidden').addClass(classToAdd);
			};
			
			$scope.openBlog = function() {
				$window.open('http://colescodeco.tumblr.com', '_blank');
				onItemClick();
			};
			
			$scope.$root.$on('$stateChangeSuccess', function ($event, toState, toParams, fromState, fromParams) {
				var newTitle = 'colehafner.com - ' + toState.name;
				$window.document.title = newTitle;
				$scope.selected = toState.name;
			});
			
			angular.element($window).bind('resize', function () {
				console.log('maybe resizing...');
				if($window.innerWidth <= 800 && $scope.el.hasClass('visible')) {
					$scope.toggle();
				}else if ($window.innerWidth > 800 && !$scope.el.hasClass('visible')) {
					$scope.toggle();
				}
			});
			
			function onItemClick() {
				var tab = $scope.el.children('.toggle');
				
				if (!tab || tab.css('display') !== 'block') {
					return;
				}

				$scope.toggle();
			}
		}]
	};
}]);