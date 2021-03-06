// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  /* Data to display.
  1. Title
  2. Image
  3. Desc
  4. Prep
  5. Ingredients
  */
  $scope.isLoading1=1;
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.display = function() {
  	Dinner.Dish.get({id:$routeParams.dishId}, function(data) {
  		$scope.isLoading1=0;
  		$scope.dish = data;
  		$scope.Title = data.Title;
  		$scope.Image = data.ImageURL;
  		$scope.Description = data.Description;
  		$scope.Instructions = data.Instructions;
  		$scope.Ingredients = data.Ingredients;
  	}, function() {

  	});
  }

  $scope.totalPrice = function() {
  	$scope.IngredientsArray = $scope.Ingredients;
  	var totalPrice = 0;
  		for (var i = 0; i < $scope.IngredientsArray.length; i++){
  			totalPrice = totalPrice + $scope.IngredientsArray[i].Quantity;
  		}
  	return parseInt(totalPrice);
  }

  $scope.addDishToMenu = function() {
	Dinner.addDishToMenu($scope.dish);
  }



  
  $scope.display();
  
});