angular.module('contac.services', [])
.factory('ContacService', function() {
	var lenses = [
		{id: '0', side: 'left', openedDate: '1288323623006', schedule: '14'},
		{id: '1', side: 'right', openedDate: '1288323623006', schedule: '14'}
	];

	return {
		all: function() {
			return lenses;
		},
		add: function(date, whichSide, scheduledDays) {
			var newLense = { side: whichSide, schedule: scheduledDays }
			lenses.push(newLense);
		},
		get: function(id) {
			console.log("hello");
			return lenses[id];
		}
	}
});

/*angular.module('starter.services', [])*/

/**
 * A simple example service that returns some data.
 */
//.factory('PetService', function() {
  //// Might use a resource here that returns a JSON array

  //// Some fake testing data
  //var pets = [
    //{ id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    //{ id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    //{ id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    //{ id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  //];

  //return {
    //all: function() {
      //return pets;
    //},
    //get: function(petId) {
      //// Simple index lookup
      //return pets[petId];
    //}
  //}
/*});*/
