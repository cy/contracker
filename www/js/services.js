Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var servicesModule = angular.module('contac.services', []);
servicesModule.constant('notificationPrefix', 'com.christine-yu.contac.lense.');
servicesModule
.factory('ContacService', function(notificationPrefix) {
	var lenses = [
		//{id: 0, openedDate: '1288323623006', side: 'left', schedule: 14, daysSkipped: 0}
	];

	return {
		all: function() {
			return lenses;
		},
		add: function(lense) {
			lenses.push(lense);
		},
		get: function(id) {
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].id == id) {
					return lenses[i];
				}
			}
		},
		makeNew: function() {
			console.log("make new!");
			var maxId = -1;
			for (var key in lenses) {
				var obj = lenses[key];
				if(maxId < obj['id'])
					maxId = obj['id'];
			}
			var newLense = { id: maxId + 1, openedDate: new Date(), side: 'left', schedule: 14, daysSkipped: 0};
			return newLense;
		},
		skipDays: function(id, numDays) {
			lenses.forEach(function(lense) {
				if(lense.id === id) {
					lense.daysSkipped += numDays;
					return;
				}
			});
		},
		getExpiryDate: function(id) {
			var lense = this.get(id);
			return lense.openedDate.addDays(lense.daysSkipped + lense.schedule);
		},
		scheduleNotification: function(id) {
			console.log("notification id is " + notificationPrefix + id);

			window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				 console.log('a Scheduled IDs: ' + scheduledIds.join(' ,'));
			});

			var lense = this.get(id);
			var notificationId = notificationPrefix + id;
			window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				for(var i = 0; i < scheduledIds.length; i++) {
					if(notificationId == scheduledIds[i]) {
						console.log("already scheduled, cancel and reschedule");
						window.plugin.notification.local.cancel(notificationId);
					}
				}	
			});

			window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				 console.log('b Scheduled IDs: ' + scheduledIds.join(' ,'));
			});

			window.plugin.notification.local.add({
				id : notificationId,
				date: this.getExpiryDate(id),
				message: "Time to change your contact lense!",
				title: "Contac"
			});	

			window.plugin.notification.local.getScheduledIds( function (scheduledIds) {
				 console.log('c Scheduled IDs: ' + scheduledIds.join(' ,'));
			});

		}

	}
});

