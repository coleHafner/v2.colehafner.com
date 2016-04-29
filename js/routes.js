angular.module('cjh')

.config([
	'$stateProvider',
	'$urlRouterProvider',
function (
	$stateProvider,
	$urlRouterProvider
) {
	$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomeCtrl as ctrl',
			templateUrl: 'home.html'
		})

		.state('projects', {
			url: '/projects',
			controller: 'ProjectsCtrl as ctrl',
			templateUrl: 'projects.html'
		})

		.state('blog', {
			url: '/blog',
			controller: 'BlogCtrl as ctrl',
			templateUrl: 'blog.html'
		});

	$urlRouterProvider.otherwise('/');
}]);