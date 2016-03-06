dinnerPlannerApp.controller('prepCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}


});