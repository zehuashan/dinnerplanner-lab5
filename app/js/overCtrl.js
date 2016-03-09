dinnerPlannerApp.controller('overCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.Menu = Dinner.getFullMenu();
	
	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}

  	$scope.prices = function (){
    if (Dinner.returnMenuPrice()==null){
      $scope.totalPrice = 0;
    } else {  $scope.totalPrice = Dinner.returnMenuPrice();}
  	}
  	$scope.displayMenu();
  	$scope.prices();
});