dinnerPlannerApp.controller('prepCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	//$scope.letterLimit = 750;
	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}

  	$scope.displayMenu();

});