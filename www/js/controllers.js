angular.module('contac.controllers', [])
.controller('LensesIndexCtrl', function($scope, ContacService) {
	$scope.lenses = ContacService.all();
})
.controller('LenseDetailCtrl', function($scope, $stateParams, ContacService) {
	$scope.lense = ContacService.get($stateParams.id);
})
.controller('LenseNewCtrl', function($scope, ContacService) {
	$scope.newLense = ContacService.makeNew();
	$scope.addDays = function(days) {
		$scope.newLense.schedule += days;
	}
	$scope.setSide = function(whichSide) {
		if (whichSide === 'left') {
			$scope.newLense.side = 'left';
		} else if (whichSide === 'right') {
			$scope.newLense.side = 'right';
		} else {
			console.log("invalid side");
		}
	}
	$scope.saveLense = function() {
		console.log($scope.newLense);
		ContacService.add($scope.newLense);
	}
});

/*angular.module('starter.controllers', [])*/


//// A simple controller that fetches a list of data from a service
//.controller('PetIndexCtrl', function($scope, PetService) {
  //// "Pets" is a service returning mock data (services.js)
  //$scope.pets = PetService.all();
//})


//// A simple controller that shows a tapped item's data
//.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  //// "Pets" is a service returning mock data (services.js)
  //$scope.pet = PetService.get($stateParams.petId);
/*});*/
