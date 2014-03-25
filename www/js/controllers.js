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
    scope: $scope,
    animation: 'slide-in-up'
  });

	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	$scope.pickMonth = function(pickedMonth) {
		$scope.newLense.openedDate.setMonth(pickedMonth);
		$scope.closeModal();
	}

	$scope.scrollDate = function(days) {
		$scope.newLense.openedDate.setDate($scope.newLense.openedDate.getDate()+days);
	}

	$scope.scrollYear = function(years) {
		$scope.newLense.openedDate.setFullYear($scope.newLense.openedDate.getFullYear()+years);
	}

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});

