angular.module('contac.controllers', [])
.controller('LensesIndexCtrl', function($scope, ContacService) {
	$scope.lenses = ContacService.all();
	$scope.hello = 'world';
})
.controller('LenseDetailCtrl', function($scope, $stateParams, ContacService) {
	$scope.lense = ContacService.get($stateParams.id);
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
