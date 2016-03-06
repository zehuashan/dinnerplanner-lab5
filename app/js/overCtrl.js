dinnerPlannerApp.controller('overCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}

  	$scope.displayMenu();
});