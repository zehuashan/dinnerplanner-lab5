dinnerPlannerApp.controller('overCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.Menu = Dinner.getFullMenu();
	
	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}

  	$scope.prices = function (){
  	$scope.priceArray = [];
  	var price = 0;
  	$scope.totalPrice = 0;
  		for (var i = 0; i < $scope.Menu.length; i++){
  			price = (Dinner.getDishPrice($scope.Menu[i])/$scope.numberOfGuests) | 0;
  			$scope.Menu[i].Price = price;
  			$scope.priceArray[i] = price | 0;
  			$scope.totalPrice = $scope.totalPrice + $scope.priceArray[i];
  		}
  	}
  	$scope.displayMenu();
  	$scope.prices();
});