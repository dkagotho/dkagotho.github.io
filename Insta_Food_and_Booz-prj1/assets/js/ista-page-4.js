$(document).ready(function(){

    
    var urlParams = new URLSearchParams(window.location.search);

  

    var mealID = urlParams.get('mealID');
    var drinkID =urlParams.get('drinkID');

    mealUrl ="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealID+"&api-key=1"
    drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkID+"&api-key=1"

    $.ajax({
        url: mealUrl,
        methog: "GET"

    }).then(function(response){

        console.log(response.meals[0])

        $("#foodImage").append("<li class=caralho >"+response.meals[0].strMeal+"</li>")
        $("#foodImage").append("<li><img src="+response.meals[0].strMealThumb+" alt="+response.meals[0].strMeal +"></li>");
        console.log(response.meals[0].strIngredient1)
        

        for (let index = 1; index < 20; index++) {

                var ingredient = "strIngredient"+index;
                var measure = "strMeasure"+index;

                if(response.meals[0][ingredient]){
                    // $("#igredientsFood").append("<li>"+res^ponse.meals[0][ingredient]+"</li>") 
                    $("#igredientsFood").append( '<tr><td>' + response.meals[0][ingredient] +"</td><td>" + response.meals[0][measure]+ '</td></tr>' );
                }

           
            console.log(response.meals[0][ingredient])
            
        }
       



    })

    $.ajax({
        url: drinkUrl,
        methog: "GET"

    }).then(function(response){

        console.log(response.drinks[0])

        $("#drinkImage").append("<li class= caralho>"+response.drinks[0].strDrink+"</li>")
        $("#drinkImage").append("<li><img src="+response.drinks[0].strDrinkThumb+" alt="+response.drinks[0].strDrink +"></li>");

        for (let index = 1; index < 20; index++) {

            var ingredient = "strIngredient"+index;
            var measure = "strMeasure"+index;


            if(response.drinks[0][ingredient]){
                // $("#igredientsDrink").append("<li>"+response.drinks[0][ingredient]+"</li>") 
                $("#igredientsDrink").append( '<tr><td>' + response.drinks[0][ingredient] +"</td><td>" + response.drinks[0][measure]+ '</td></tr>' );
            }

       
        console.log(response.drinks[0][ingredient])
        
    }
        
        


    })
    


})