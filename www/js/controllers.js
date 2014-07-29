angular.module('contracker.controllers', [])
.controller('LensesIndexCtrl', function($scope, $ionicModal, ContrackerService) {
	$scope.lenses = ContrackerService.all();
	$scope.paired = ContrackerService.getPaired();

	$scope.rightLenses = ContrackerService.getRights();
	$scope.leftLenses = ContrackerService.getLefts();

	$scope.getExpiryDate = function(id) {
		return ContrackerService.getExpiryDate(id);
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
		ContrackerService.skipDays($scope.clickedId, $scope.daysToSkip);
		ContrackerService.scheduleNotification($scope.clickedId);
		$scope.closeModal();
	};
})
.controller('LenseDetailCtrl', function($scope, $stateParams, $location, $ionicModal, ContrackerService) {
	if($stateParams.id === undefined) {
		$scope.newLense = ContrackerService.makeNew();
		$scope.isNew = true;
	}
	else {
		$scope.newLense = ContrackerService.get($stateParams.id);
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
			ContrackerService.add($scope.newLense);
		ContrackerService.scheduleNotification($scope.newLense.id);
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
.controller('SettingsCtrl', function($scope, ContrackerService, SettingsService) {
	$scope.settings = SettingsService.get();
	$scope.notificationTime = SettingsService.getNotificationTime();
	$scope.onOff = ($scope.settings.pushNotification) ? "On" : "Off";
  $scope.pushNotificationChange = function() {
    console.log('Push Notification Change', $scope.settings.pushNotification);
		SettingsService.save();
		$scope.$apply();
		if($scope.settings.pushNotification) {
			var lenses = ContrackerService.all();
			for(var i = 0; i < lenses.length; i++) {
				ContrackerService.scheduleNotification(lenses[i].id);
			}
		} else {
			window.plugin.notification.local.cancelAll();
		}
  };
	$scope.switchAmPm = function() {
		$scope.notificationTime.setHours($scope.notificationTime.getHours()+12);
		SettingsService.save();
	};
	$scope.scrollHour = function(hours) {
		$scope.notificationTime.setHours($scope.notificationTime.getHours()+hours);
		SettingsService.save();
	};
	$scope.scrollMin = function(min) {
		$scope.notificationTime.setMinutes($scope.notificationTime.getMinutes()+min);
		SettingsService.save();
	};
	$scope.listAllScheduled = function() {
		window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				 console.log('a Scheduled IDs: ' + scheduledIds.join(' ,'));
		});
	}
	$scope.cancelAllNotifications = function() {
		window.plugin.notification.local.cancelAll();
	}

});

