angular.module('contac.services', [])
.factory('ContacService', function() {
	var lenses = [
	];

	return {
		all: function() {
			return lenses;
		},
		add: function(lense) {
			lenses.push(lense);
		},
		get: function(id) {
			return lenses[id];
		},
		makeNew: function() {
			console.log("make new!");
			var maxId = -1;
			for (var key in lenses) {
				var obj = lenses[key];
				if(maxId < obj['id'])
					maxId = obj['id'];
			}
			var newLense = { id: maxId + 1, openedDate: new Date(), side: 'left', schedule: 14};
			return newLense;
		}
	}
});

