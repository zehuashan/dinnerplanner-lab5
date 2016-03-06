dinnerPlannerApp.controller('overCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.displayMenu = function() {
  		$scope.Menu = Dinner.getFullMenu();
  	}

  	$scope.prices = function (){
  		console.log($scope.Menu);
  		$scope.priceArray = [];
  		var price = 0;
  		$scope.totalPrice = 0;
  			for (var i = 0; i < $scope.Menu.length; i++){
  				price = Dinner.getDishPrice($scope.Menu[i])/$scope.numberOfGuests;
  				$scope.priceArray[i] = price | 0;
  				console.log($scope.priceArray);
  				$scope.totalPrice = $scope.totalPrice + $scope.priceArray[i];
  				}
  	}
  	$scope.displayMenu();
  	$scope.prices();
});