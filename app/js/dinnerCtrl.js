// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner,$cookieStore) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.Menu = Dinner.getFullMenu();

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
    //console.log("Items = " + Items.RecipeID);
  	var index = $scope.Menu.indexOf(Items);
  	$scope.Menu.splice(index, 1);
  	$scope.prices();
    Dinner.removeDishFromCookies(Items.RecipeID);
  }

  $scope.prices = function (){
    console.log('JAJAJAJA');
  	$scope.priceArray = [];
  	var price = 0;
  	$scope.totalPrice = 0;
    console.log($scope.Menu);
  		for (var i = 0; i < $scope.Menu.length; i++){
        console.log('HEJHEJ');
  			price = (Dinner.getDishPrice($scope.Menu[i])/$scope.numberOfGuests) | 0;
  			$scope.Menu[i].Price = price;
  			$scope.priceArray[i] = price | 0;
  			$scope.totalPrice = $scope.totalPrice + $scope.priceArray[i];
  		}
  	}
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.displayMenu();
  $scope.prices();
});