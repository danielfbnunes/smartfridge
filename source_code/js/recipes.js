

var dictionary_recipes = {};
var dictionary_products = {};

$(document).ready(function () {
    /*
    dictionary_recipes = { 
    "Quick Chicken!": [["ing1","chicken", "olive oil", "ketchip", "onion", "soy sauce", "sugar", "lemon juice", "pepper"], "<h4><b>Ingredients</b></h4>2 tablespoons olive oil <br>1 onion <br>4 skinless boneless chicken breast <br>3 tablespoons ketchup <br>2 tablespoons soy sauce <br>3 tablespoons white sugar<br>2 tablespoons lemon juice <br><br> <h4><b>Methods</b></h4> 1-Saute onion in oil until translucent.  <br>2-Add chicken, and brown lightly.  <br>3-Combine ketchup, soy sauce, sugar, lemon juice, and pepper; mix well. Pour over chicken, and bring to a boil. Cover, reduce heat, and simmer for 25 to 35 minutes. ", 0],
    "Pancakes": [["ing2", "flour", "salt"], "<h4><b>Ingredients</b></h4>1 cup all-purpose flour <br>2 tablespoons white sugar <br>2 teaspoons baking powder <br>1 teaspoon salt <br>1 egg, beaten <br>1 cup milk <br>2 tablespoons vegetable oil<br><br> <h4><b>Methods</b></h4> 1-In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth. <br>2-Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.  ", 0] ,
    "Chicken Casserole": [["ing1", "ing2", "ing23"], "<h4><b>Ingredients</b></h4> 4 chicken breast halves<br> 1 (10.75 ounce) can condensed cream of chicken soup <br> 1 cup sour cream<br>32 buttery round crackers <br>1/4 cup chopped onion (optional) <br> 1/4 cup chopped mushrooms (optional)<br><br><br> <h4><b>Methods</b></h4> 1- Preheat oven to 350 degrees F (175 degrees C).  <br>2- Boil chicken until cooked through (no longer pink inside), about 20-30 minutes. Chop into bite size pieces and place in a 9x13 inch baking dish.  <br>3- Combine soup, sour cream, onion (optional) and mushrooms (optional). Pour mixture over chicken and top with crumbled crackers. Cover and bake at 350 degrees F (175 degrees C) for 30 minutes (or freeze for baking at another time). ", 0] 
    };
    console.log(recToStr(dictionary_recipes));
    localStorage.setItem("recLS", recToStr(dictionary_recipes));

    dictionary_products = { "ing1": [2, "kg", "", ""], "ing2": [500, "g", "", ""], "ing3": [2, "L", "", ""], "ing21": [2, "L", "", ""], "ing23": [2, "L", "", ""] };
    localStorage.setItem("prodLS", prodToStr(dictionary_products));
    */
    
    dictionary_recipes = recToDic(localStorage.getItem("recLS"));
    dictionary_products = prodToDic(localStorage.getItem("prodLS"));
    
    
    getTable();
})


window.onbeforeunload = function () {
    //recStr = recToStr(dictionary_recipes);
    //localStorage.setItem("recLS", recStr);
    prodStr = prodToStr(dictionary_products);
    localStorage.setItem("prodLS", prodStr);
};

/*  --- Js function used everytime we update the table ---
It uses an array to fill in each row
*/
function getTable() {
    for (var key in dictionary_products) {
        var div = $('<tr class="tr_body_table" />');
        div.html(GetDynamicTextBox(key, dictionary_products[key]));
        $("#TextBoxContainer").append(div);
    }
}


function GetDynamicTextBox(element, quant) {
    var quantity = quant[0];
    var typeQuant = quant[1];

    return '<td style="width:35%"><label style="text-align: center;">' + element + '<label/></td>' +
        '<td style="width:37%; text-align: center;"><label style="text-align: center;">' + quantity + "&nbsp" + typeQuant + '<label/></td>' +
        '<td style="text-align: center; width: 28%"><input class="messageCheckbox" type="checkbox" value="' + element + '">'
}

function prodToStr(prodDB) {
    var prodStr = "";
    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        prodStr += keys[i] + ":" + prodDB[keys[i]][0] + "," + prodDB[keys[i]][1] + "," + prodDB[keys[i]][2] + "," + prodDB[keys[i]][3];

        if (i < keys.length - 1)
            prodStr += "|";
    }
    return prodStr;
}

function prodToDic(prodStr) {
    var line;
    dic = {};
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        line = arraySplited[i];
        dic[line.split(":")[0]] = [parseInt(line.split(":")[1].split(",")[0]), line.split(":")[1].split(",")[1], line.split(":")[1].split(",")[2], line.split(":")[1].split(",")[3]];
    }
    return dic;
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

function recToDic(recipeStr) {
    var line;
    dic = {};
    var arraySplited = recipeStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        line = arraySplited[i];
        var ingArray = line.split(":")[1].split("?")[0].split(";");
        var desc = line.split(":")[1].split("?")[1];
        console.log(desc);
        var fav = parseInt(line.split(":")[1].split("?")[2]);
        console.log(fav);

        dic[line.split(":")[0]] = [ingArray, desc, fav];
    }
    console.log(dic);
    return dic;
    
}


function checkedVals() {
    var noValueChecked = true;
    var div = document.getElementById("recipeText");
    var title = document.getElementById("recipeTitle");
    var inputElements = document.getElementsByClassName('messageCheckbox');

    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            noValueChecked = false;
        }
    }

    if (noValueChecked) {
        div.innerHTML = "<h3>Please select some products!</h3>";
        title.innerHTML = "";
        document.getElementById("btnShare").disabled = true;
        document.getElementById("buttonFullscreen").disabled = true;
        document.getElementById("btnPrev").disabled = true;
        document.getElementById("btnNext").disabled = true;
        document.getElementById("toggle-heart-2").style.display = "none";
        document.getElementById("toggle-heart").style.display = "none";
    } else {
        writeRecipes(inputElements);
    }
}

function writeRecipes(inputElements) {
    var recipesToShow = {};
    for (var key in dictionary_recipes) {
        var check = true;
        var ingr = dictionary_recipes[key][0];
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].checked) {
                var temp = false;
                for (var x = 0; x < ingr.length; x++) {
                    if (inputElements[i].value == ingr[x]) {
                        temp = true;
                    }
                }
                if (!temp) {
                    check = false;
                }
            }

        }
        if (check) {
            recipesToShow[key] = dictionary_recipes[key];
        }
    }
    var quantityArray = document.getElementsByClassName('quantityNumber');
    var div = document.getElementById("recipeText");
    var title = document.getElementById("recipeTitle");
    var titles = [];
    var text = [];
    var hearts = [];
    for (var key in recipesToShow) {
        var recipeText = '<div style="height: 10vh" class="mySlides">';
        //titulo
        var recipeTitle = key;
        //ingredientes
        //recipeText += "<h4><b>Ingredients:</b></h4>";
        for (var i = 0; i < recipesToShow[key][0].length; i++) {
            for (key2 in dictionary_products) {
                console.log(recipesToShow[key][0][i] == key2);
                if (key2 == recipesToShow[key][0][i]) {
                    //recipeText += "<p>" + recipesToShow[key][0][i] + " : " + dictionary_products[key2][0] + " " + dictionary_products[key2][1] + "</p>";
                }
            }
        }
        //descricao
        console.log(recipesToShow);
        //recipeText += "</br> <h4><b>Description:</b></h4>";
        recipeText += "<p>" + recipesToShow[key][1] + "</p></div>";
        text.push(recipeText);
        titles.push(recipeTitle);
        var heartColor;
        if (recipesToShow[recipeTitle][2] == 0) {
            heartColor = "grey";
        } else {
            heartColor = "red";
        }
        hearts.push('<input onclick="changeHeart(\'' + recipeTitle + '\')" id="toggle-heart" type="checkbox" /><label style="color: ' + heartColor + '" id="toggle-heart-2" for="toggle-heart">♥</label>');

    }

    if (Object.keys(recipesToShow).length === 0) {
        div.innerHTML = "<h3>No recipes found!</h3>";
        title.innerHTML = "";
        document.getElementById("btnShare").disabled = true;
        document.getElementById("buttonFullscreen").disabled = true;
        document.getElementById("btnPrev").disabled = true;
        document.getElementById("btnNext").disabled = true;
        document.getElementById("toggle-heart-2").style.display = "none";
        document.getElementById("toggle-heart").style.display = "none";
    } else {

        title.innerHTML = '<h3 class="modal-title">' + titles[0] + '</h3>';
        div.innerHTML = text[0];
        document.getElementById("heart").innerHTML = hearts[0];



        string_title = "";
        string_text = "";
        string_hearts = "";

        for (var i = 0; i < titles.length; i++) {
            if (i == titles.length - 1) {
                string_title += titles[i];
                string_text += text[i];
                string_hearts += hearts[i];
            } else {
                string_title += titles[i] + "|";
                string_text += text[i] + "|";
                string_hearts += hearts[i] + "|";
            }
        }

        localStorage.setItem("titleArray", string_title);
        localStorage.setItem("textArray", string_text);
        localStorage.setItem("heartsArray", string_hearts);
    }
}

function changeHeart(recipeTitle) {
    var string_heart = "";
    var titles = localStorage.getItem("titleArray").split("|");
    var hearts = localStorage.getItem("heartsArray").split("|");
    for (var i = 0; i < titles.length; i++) {
        if (titles[i] == recipeTitle) {
            if (document.getElementById("toggle-heart-2").style.color == "grey") {
                document.getElementById("toggle-heart-2").style.color = "red";
                hearts[i] = '<input onclick="changeHeart(\'' + recipeTitle + '\')" id="toggle-heart" type="checkbox" /><label style="color:red" id="toggle-heart-2" for="toggle-heart">♥</label>';
                dictionary_recipes[recipeTitle][2] = 1;
                //console.log(dictionary_recipes);
                recStr = recToStr(dictionary_recipes);

                localStorage.setItem("recLS", recStr);
            } else {
                document.getElementById("toggle-heart-2").style.color = "grey";
                hearts[i] = '<input onclick="changeHeart(\'' + recipeTitle + '\')" id="toggle-heart" type="checkbox" /><label style="color:grey" id="toggle-heart-2" for="toggle-heart">♥</label>';
                dictionary_recipes[recipeTitle][2] = 0;
                recStr = recToStr(dictionary_recipes);
                localStorage.setItem("recLS", recStr);
            }
        }
    }

    for (var i = 0; i < titles.length; i++) {
        if (i == titles.length - 1) {
            string_heart += hearts[i];
        } else {
            string_heart += hearts[i] + "|";
        }
    }

    localStorage.removeItem("heartsArray");
    localStorage.setItem("heartsArray", string_heart);
}

function getRecipe(buttonClicked) {
    var string_title = "";
    var string_text = "";
    var string_heart = "";
    string_title = localStorage.getItem("titleArray");
    string_text = localStorage.getItem("textArray");
    string_heart = localStorage.getItem("heartsArray");
    var title = string_title.split("|");
    var text = string_text.split("|");
    var hearts = string_heart.split("|");
    var current_title = document.getElementById("recipeTitle").children[0].textContent;
    for (var i = 0; i < title.length; i++) {
        if (title[i] == current_title) {
            if (buttonClicked == "next") {
                var x = i;
                if ((i + 1) == title.length) {
                    x = -1;
                }
                document.getElementById("recipeTitle").innerHTML = '<h3 class="modal-title">' + title[x + 1] + '</h3>';
                document.getElementById("recipeText").innerHTML = text[x + 1];
                document.getElementById("heart").innerHTML = hearts[x + 1];
            }

            if (buttonClicked == "prev") {
                var x = i;
                if ((i - 1) == -1) {
                    x = title.length;
                }
                document.getElementById("recipeTitle").innerHTML = '<h3 class="modal-title">' + title[x - 1] + '</h3>';
                document.getElementById("recipeText").innerHTML = text[x - 1];
                document.getElementById("heart").innerHTML = hearts[x - 1];
            }

        }
    }
}

function buttonsEnabled() {
    document.getElementById("btnShare").disabled = false;
    document.getElementById("buttonFullscreen").disabled = false;
    document.getElementById("btnPrev").disabled = false;
    document.getElementById("btnNext").disabled = false;
    document.getElementById("toggle-heart-2").style.display = "";
    document.getElementById("toggle-heart").style.display = "";

}

function goFullscreen() {
    var modalTitle = document.getElementById("fullScreenTitle");
    var modalText = document.getElementById("fullScreenText");
    modalTitle.innerHTML = document.getElementById("recipeTitle").textContent;
    modalText.innerHTML = '<div style="height: 70vh; overflow: auto;">' + document.getElementById("recipeText").innerHTML + '</div>' + '<div><button type="button" class="col-xs-offset-4 col-xs-4 btn btn-primary" data-dismiss="modal">Exit</button></div><br /><br />';
}




