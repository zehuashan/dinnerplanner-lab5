// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {
  
  var numberOfGuests = 4;
  var maxdishes = 0;
  var addedDishes = [];




/*
  if($cookieStore.get('numberOfGuests')) {
    var numberOfGuests = $cookieStore.get('numberOfGuests');
  } else {
    var numberOfGuests = 4;
  }


  if($cookieStore.get('addedDishes')) {
    var selectedMenu = $cookieStore.get('addedDishes');
    for(id in selectedMenu) {
      this.Dish.get({id:selectedMenu[id]}, (data) => {
        console.log("Are we in yet?!")
        this.addDishToMenu(data);
      });
    }
  }
  */

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  var savedDish = 1;
    
  this.trackId = function(id) {
      savedDish = id;
    }
    
  this.giveId = function() {
      return savedDish;
    }
  
  var menu = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    $cookieStore.put('numberOfGuests', num);
  }

  // should return 
  this.getNumberOfGuests = function () {
    //TODO Lab 2
    return numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function (type) {
    //TODO Lab 2
    for(key in menu) {
      if(menu[key].Category == type) {
        return menu[key];
      }
    }
  }

  this.rePopMenu = function() {
    for(var i=0;i<4;i++){

    }
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function () {
    //TODO Lab 2
        return menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    //TODO Lab 2
        var allIngredients = new Array();
        for (key in menu) {
            for(i in menu[key].Ingredients) {
                allIngredients.push(menu[key].Ingredients[i]);
            }
        }
        return allIngredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
        var totalPrice = 0;
        allIngredients = this.getAllIngredients();
        for (key in allIngredients) {
            totalPrice += allIngredients[key].Quantity;
        }
        return totalPrice * numberOfGuests;
  }

  this.getDishPrice = function (inDish) {
    var price = 0;
    for (key in inDish.Ingredients) {
      price += inDish.Ingredients[key].Quantity;
    }
    price = price * numberOfGuests;
    return price;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(inDish) {
    //TODO Lab 2
        //console.log(inDish);
        if (maxdishes <= 2){
        var dish = inDish;
        for(key in menu) {
          if(menu[key].Category == dish.Category) {
              var alertMsg = 'Only one ' + menu[key].Category + ' is allowed, in order to choose another ' + menu[key].Category + ', please remove the last one.';
              alert(alertMsg);
              return false;
          }
        }
        addedDishes.push(inDish.RecipeID)
        $cookieStore.put('addedDishes', addedDishes);
        console.log("Print Cookie: " + $cookieStore.get('addedDishes'));
        menu.push(dish);
        maxdishes = maxdishes + 1;
        console.log(menu);} 
        else {
          alert("Maximum 3 items in menu.");
        } 
  }

  //Removes dish from menu
  this.removeDishFromCookies = function(id) {
    maxdishes = maxdishes - 1;
    var index = addedDishes.indexOf(id);
    if(index > -1) {
      addedDishes.splice(index, 1);
      console.log(addedDishes);
      $cookieStore.put('addedDishes', addedDishes); 
    }
  }


  /* old remove function, temporary using this function above
  this.removeDishFromMenu = function(id) {
    //TODO Lab 2
        for(key in menu) {
          if(menu[key].RecipeID == id) {
            delete menu[key];
          }
        }
  }*/

  this.getDishName = function (id) {
    for (key in dishes) {
      if(dishes[key].RecipeID == id) {
        return dishes[key].Title;
      }
    }
  }
  
  // ---------------------------------Lab 4 starts here!-------------------------------------

  // API key for BigOven data.
  var apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4";
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey}); 

  var getDish = this.Dish.get;
  var getDishPrice = this.getDishPrice;

    if($cookieStore.get('numberOfGuests') !== undefined) {
      numberOfGuests = $cookieStore.get('numberOfGuests');
    }


    if($cookieStore.get('addedDishes') !== undefined) {
      addedDishes = $cookieStore.get('addedDishes');
      for (var i = 0; i < addedDishes.length; i++) {
        getDish({id:addedDishes[i]}, function(dish) {
          dish.Price = (getDishPrice(dish)/numberOfGuests) | 0;
          menu.push(dish);
          }, function(data) {
            console.log("there was an error")
          });
      }
    }
 
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});