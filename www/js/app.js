ionic.Platform.ready(function(){
	  console.log("Cordova is ready, let's do this!");
		window.plugin.notification.local.add({ message: 'Great app!' });
});

angular.module('contac', ['ionic', 'contac.services', 'contac.controllers'])
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
				templateUrl: 'templates/new.html',
				controller: 'LenseNewCtrl'
			}
		}
	})
	.state('tab.edit', {
		url: '/edit/:id',
		views: {
			'lenses-tab': {
				templateUrl: 'templates/edit.html',
				controller: 'LenseDetailCtrl'
			}
		}
	})
	.state('tab.settings', {
		url: '/settings',
		views: {
			'settings-tab' : {
				templateUrl: 'templates/settings.html'
			}
		}
	});

	//fallback route
	$urlRouterProvider.otherwise('tab/lenses');
});

