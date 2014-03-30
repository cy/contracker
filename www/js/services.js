Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

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
		}
	}
});

