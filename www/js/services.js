angular.module('contac.services', [])
.factory('ContacService', function() {
	var lenses = [
		{id: '0', side: 'left', openedDate: '1288323623006', schedule: 14},
		{id: '1', side: 'right', openedDate: '1288323623006', schedule: 14}
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
			var newLense = { openedDate: new Date(), side: 'left', schedule: 14};
			return newLense;
		}
	}
});

