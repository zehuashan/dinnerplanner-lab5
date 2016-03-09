// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner,$cookieStore) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.Menu = Dinner.getFullMenu();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
    $scope.prices();
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.displayMenu = function() {
  	$scope.Menu = Dinner.getFullMenu();
    $scope.prices();
  }

  $scope.removeDish= function(Items) {
    //console.log("Items = " + Items.RecipeID);
  	var index = $scope.Menu.indexOf(Items);
    var removedPrice = $scope.Menu[index].Price;
    Dinner.adjustPriceMin(removedPrice);
    Dinner.removeDishFromCookies(Items.RecipeID);
  	$scope.Menu.splice(index, 1);
  	$scope.prices();
  }

  $scope.prices = function (){
    if (Dinner.returnMenuPrice()==null){
      $scope.totalPrice = 0;
    } else {
      console.log(Dinner.returnMenuPrice());  
      $scope.totalPrice = Dinner.returnMenuPrice();}
  	}
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.displayMenu();
  $scope.prices();
});