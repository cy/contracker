angular.module('contracker', ['ionic', 'contracker.services', 'contracker.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})
	.state('tab.lenses', {
		url: '/lenses',
		views: {
			'lenses-tab': {
				templateUrl: 'templates/lenses.html',
				controller: 'LensesIndexCtrl'
			}
		}
	})
	.state('tab.new', {
		url: '/new',
		views: {
			'new-tab': {
				templateUrl: 'templates/lense-detail.html',
				controller: 'LenseDetailCtrl'
			}
		}
	})
	.state('tab.edit', {
		url: '/lense/:id',
		views: {
			'lenses-tab': {
				templateUrl: 'templates/lense-detail.html',
				controller: 'LenseDetailCtrl'
			}
		}
	})
	.state('tab.settings', {
		url: '/settings',
		views: {
			'settings-tab' : {
				templateUrl: 'templates/settings.html',
				controller: 'SettingsCtrl'
			}
		}
	});

	//fallback route
	$urlRouterProvider.otherwise('tab/lenses');
});

