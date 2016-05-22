angular.module('cjh')

.config([
	'$stateProvider',
	'$urlRouterProvider',
function (
	$stateProvider,
	$urlRouterProvider
) {
	$stateProvider
		.state('about', {
			url: '/',
			controller: 'AboutCtrl as ctrl',
			templateUrl: 'about.html'
		})

		.state('projects', {
			url: '/projects',
			controller: 'ProjectsCtrl as ctrl',
			templateUrl: 'projects.html'
		})
		
		.state('resume', {
			url: '/resume',
			controller: 'ResumeCtrl as ctrl',
			templateUrl: 'resume.html'
		});

	$urlRouterProvider.otherwise('/');
}]);