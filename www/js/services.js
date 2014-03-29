angular.module('contac.services', [])
.factory('ContacService', function() {
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
			//return lenses[id];
			for(var i = 0; i < lenses.length; i++) {
				if(lenses[i].id == id) {
					return lenses[i];
				}
			}
			/*lenses.forEach(function(lense) {*/
				//console.log("lense.id " + lense.id + " id " + id);
				//if(lense.id == id) {
					//return lense;
				//}
			/*});*/
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
		}
	}
});

