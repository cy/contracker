angular.module('contac.controllers', [])
.controller('LensesIndexCtrl', function($scope, $ionicModal, ContacService) {
	$scope.lenses = ContacService.all();
	$scope.getExpiryDate = function(id) {
		return ContacService.getExpiryDate(id);
	};
  $ionicModal.fromTemplateUrl('skip.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(clickedId) {
		$scope.clickedId = clickedId;
		$scope.daysToSkip = 1;
    $scope.modal.show();
  };
	$scope.scrollDaysToSkip = function(numDays) {
		$scope.daysToSkip += numDays;
	};
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
	$scope.handleSkipOK	= function() {
		ContacService.skipDays($scope.clickedId, $scope.daysToSkip);
		ContacService.scheduleNotification($scope.clickedId);
		$scope.closeModal();
	};
})
.controller('LenseDetailCtrl', function($scope, $stateParams, $location, $ionicModal, ContacService) {
	if($stateParams.id === undefined) {
		$scope.newLense = ContacService.makeNew();
		$scope.isNew = true;
	}
	else {
		$scope.newLense = ContacService.get($stateParams.id);
		$scope.isNew = false;
	}

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
		if($scope.isNew)
			ContacService.add($scope.newLense);
		ContacService.scheduleNotification($scope.newLense.id);
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

})
.controller('SettingsCtrl', function($scope, ContacService) {
  $scope.pushNotificationChange = function() {
    console.log('Push Notification Change', $scope.pushNotification.checked);
		if($scope.pushNotification.checked) {
			var lenses = ContacService.all();
			for(var i = 0; i < lenses.length; i++) {
				ContacService.scheduleNotification(lenses[i].id);
			}
		} else {
			window.plugin.notification.local.cancelAll();
		}
  };
  $scope.pushNotification = { checked: true };

	$scope.listAllScheduled = function() {
		window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				 console.log('a Scheduled IDs: ' + scheduledIds.join(' ,'));
		});
	}

	$scope.cancelAllNotifications = function() {
		window.plugin.notification.local.cancelAll();
	}

});

