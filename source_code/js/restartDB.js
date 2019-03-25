function restartDB()
{
    //products
    var prodDB = { 
        "chicken":[2,"kg", "25/05/2019", ""], 
        "milk":[1,"l","30/05/2018", ""], 
        "lettuce":[1,"unit","", "From my grandmother's backyard."],
        "cheese":[50,"g","", ""]        
    };    
    localStorage.setItem("prodLS", prodToStr(prodDB));
    
    
    //barCodes
     var barCodeDB = {
        1: "chocolate",
        2: "strawberry yogurt",
        3: "burger sauce",
        4: "pork chop"
    };
    localStorage.setItem("barCodeLS", barCodeToStr(barCodeDB));
    
    
    //watchlist
    dictionary_watchlist = {
        "milk" : 4,
        "lettuce" : 2
    };
    localStorage.setItem("watchLS", wishToStr(dictionary_watchlist));
    
    //recipes
    dictionary_recipes = { 
    "Quick Chicken!": [[,"chicken", "olive oil", "ketchip", "onion", "soy sauce", "sugar", "lemon juice", "pepper"], "<h4><b>Ingredients</b></h4>2 tablespoons olive oil <br>1 onion <br>4 skinless boneless chicken breast <br>3 tablespoons ketchup <br>2 tablespoons soy sauce <br>3 tablespoons white sugar<br>2 tablespoons lemon juice <br><br> <h4><b>Methods</b></h4> 1-Saute onion in oil until translucent.  <br>2-Add chicken, and brown lightly.  <br>3-Combine ketchup, soy sauce, sugar, lemon juice, and pepper; mix well. Pour over chicken, and bring to a boil. Cover, reduce heat, and simmer for 25 to 35 minutes. ", 0],
    "Pancakes": [["sugar", "flour", "salt", "egg" ], "<h4><b>Ingredients</b></h4>1 cup all-purpose flour <br>2 tablespoons white sugar <br>2 teaspoons baking powder <br>1 teaspoon salt <br>1 egg, beaten <br>1 cup milk <br>2 tablespoons vegetable oil<br><br> <h4><b>Methods</b></h4> 1-In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth. <br>2-Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.  ", 0] ,
    "Chicken Casserole": [["chicken", "sour cream", "crackers", "onion", "mushrooms"], "<h4><b>Ingredients</b></h4> 4 chicken breast halves<br> 1 (10.75 ounce) can condensed cream of chicken soup <br> 1 cup sour cream<br>32 buttery round crackers <br>1/4 cup chopped onion (optional) <br> 1/4 cup chopped mushrooms (optional)<br><br><br> <h4><b>Methods</b></h4> 1- Preheat oven to 350 degrees F (175 degrees C).  <br>2- Boil chicken until cooked through (no longer pink inside), about 20-30 minutes. Chop into bite size pieces and place in a 9x13 inch baking dish.  <br>3- Combine soup, sour cream, onion (optional) and mushrooms (optional). Pour mixture over chicken and top with crumbled crackers. Cover and bake at 350 degrees F (175 degrees C) for 30 minutes (or freeze for baking at another time). ", 0] 
    };
    localStorage.setItem("recLS", recToStr(dictionary_recipes));
    
    //warnings
    var dict = {
        "Exp. Date Milk": "Milk's expiration date is coming in 2 days.",
        "Temperature": "The temperature is too high!",
    };
    localStorage.setItem("warnLS", warnToStr(dict));
    
    //notes
        var dict = {
        "Rent": "Pay the rent on 30/05!",
         "Go to dentist" : "Dentist, 22/05 at 6 pm"
    };
    localStorage.setItem("notesLS",notesToStr(dict));
    console.log(localStorage.getItem("notesLS"));

}

//converts a dictionary to a String which can be saved in localStorage.
function prodToStr(prodDB) {
    var prodStr = "";
    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        var quantDesc;
        if (prodDB[keys[i]][1] === undefined)
            quantDesc = "";
        else
            quantDesc = prodDB[keys[i]][1];

        prodStr += keys[i] + ":" + prodDB[keys[i]][0] + "," + quantDesc + "," + prodDB[keys[i]][2] + "," + prodDB[keys[i]][3];

        if (i < keys.length - 1)
            prodStr += "|";
    }
    return prodStr;
}


function barCodeToStr(barCodeDB) {
    var barCodeStr = "";
    var keys = Object.keys(barCodeDB);

    for (i = 0; i < keys.length; i++) {
        barCodeStr += keys[i] + ":" + barCodeDB[keys[i]];

        if (i < keys.length - 1)
            barCodeStr += "|";
    }
    return barCodeStr;
}

function wishToStr(prodDB) {
    var prodStr = "";
    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        prodStr += keys[i] + ":" + prodDB[keys[i]];

        if (i < keys.length - 1)
            prodStr += "|";
    }
    return prodStr;
}

//Used to convert the dictionaryionary to a string
//alows that a dictionaryionary stays in localStorage
function recToStr(dictionary_recipes) {
    var keys = Object.keys(dictionary_recipes);
    var recipeStr = "";
    for (i = 0; i < keys.length; i++) {

        var recName = keys[i];
        var ingredients = dictionary_recipes[keys[i]][0];
        var descrp = dictionary_recipes[keys[i]][1];
        var fav = dictionary_recipes[keys[i]][2];

        recipeStr += recName + ":";

        for (i2 = 0; i2 < ingredients.length; i2++) {
            if (i2 < ingredients.length - 1)
                recipeStr += ingredients[i2] + ";";
            else
                recipeStr += ingredients[i2];
        }
        recipeStr += "?" + descrp + "?" + fav;

        if (i < keys.length - 1)
            recipeStr += "|";
    }
    return recipeStr;
}


function warnToStr(prodDB) {
    var prodStr = "";
    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        prodStr += keys[i] + "?" + prodDB[keys[i]];
        if (i < keys.length - 1)
            prodStr += "|";
    }
    return prodStr;
}

function notesToStr(prodDB) {
    var prodStr = "";

    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        prodStr += keys[i] + ":" + prodDB[keys[i]];
        if (i < keys.length - 1)
            prodStr += "|";
    }
    console.log(prodStr);
    return prodStr;
}