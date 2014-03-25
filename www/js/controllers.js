angular.module('contac.controllers', [])
.controller('LensesIndexCtrl', function($scope, ContacService) {
	$scope.lenses = ContacService.all();
})
.controller('LenseDetailCtrl', function($scope, $stateParams, ContacService) {
	$scope.lense = ContacService.get($stateParams.id);
})
.controller('LenseNewCtrl', function($scope, $location, $ionicModal, ContacService) {
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
		ContacService.add($scope.newLense);
		$location.path("/tab/lenses/");
	}

  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });

	//$scope.months = {'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11};

	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	$scope.pickMonth = function(pickedMonth) {
		console.log("picked " + pickedMonth);
		$scope.newLense.openedDate.setMonth(pickedMonth);
		$scope.closeModal();
	}

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Be sure to cleanup the modal
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});

