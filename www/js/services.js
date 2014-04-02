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
			//sort by openedDate, then interweave left and rights
		lenses.sort(function(a, b) {
				a = a.openedDate;
				b = b.openedDate;
				if (a>b) return -1;
				else if (a<b) return 1;
				else return 0;
			});
			var rights = new Array();
			var lefts = new Array();
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].side === 'right') {
					rights.push(lenses[i]);	
				} else if(lenses[i].side === 'left') {
					lefts.push(lenses[i]);
				}
			}
			var interweaved = new Array(rights.length+lefts.length);
			var last_side_right = false;
			for(var i = 0; i < interweaved.length; i++) {
				if(last_side_right) {
					if(lefts.length != 0) {
						interweaved[i] = lefts.shift();
						last_side_right = false;
					} else {
						interweaved[i] = rights.shift();
						last_side_right = true;
					}
				}	else {
					if(rights.length != 0) {
						interweaved[i] = rights.shift();
						last_side_right = true;
					} else {
						interweaved[i] = lefts.shift();
						last_side_right = false;
					}
				}
			}
			return interweaved;
		},
		getPaired: function() {
			var rights = new Array();
			var lefts = new Array();
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].side === 'right') {
					rights.push(lenses[i]);	
				} else if(lenses[i].side === 'left') {
					lefts.push(lenses[i]);
				}
			}
			var paired = Array();
			//var defaultRight = {id: undefined, openedDate: undefined, side: 'right', schedule: undefined, daysSkipped: undefined}
			while(lefts.length != 0) {
				var pair = {
					left: lefts.shift(),
					right: (rights.length != 0) ? rights.shift() : { side: 'right' }
				}
				paired.push(pair);
			}
			//var defaultLeft = {id: '', openedDate: '', side: 'left', schedule: '', daysSkipped: ''};
			while(rights.length != 0) {
				var pair = {
					right: rights.shift(),
					left: (lefts.length != 0) ? lefts.shift() : { side: 'left' }
				}
				paired.push(pair);
			}
			return paired;
		},
		getRights: function() {
			var rights = new Array();
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].side === 'right') {
					rights.push(lenses[i]);
				}
			}
			return rights;
		},
		getLefts: function() {
			var lefts = new Array();
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].side === 'left') {
					lefts.push(lenses[i]);
				}
			}
			return lefts;
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

