// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.displayMenu = function() {
  	$scope.Menu = Dinner.getFullMenu();
  }

  $scope.removeDish= function(Items) {
  	var index = $scope.Menu.indexOf(Items);
  	$scope.Menu.splice(index, 1);
  	console.log($scope.Menu);
  	$scope.prices();
  }

  $scope.prices = function (){
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
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.displayMenu();
  $scope.prices();
});