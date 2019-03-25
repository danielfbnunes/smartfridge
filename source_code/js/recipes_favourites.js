var dictionary_recipes = {};
var dictionary_favourites = {};
var dictionary_products = {};

$(document).ready(function () {

    dictionary_recipes = recToDic(localStorage.getItem("recLS"));
    console.log(localStorage.getItem("recLS"));
    dictionary_favourites = recToDic(localStorage.getItem("favLS"));
    console.log(dictionary_favourites); 
    dictionary_products = recToDic(localStorage.getItem("prodLS"));
    getTable();
})


window.onbeforeunload = function () {
    recStr = recToStr(dictionary_recipes);
    localStorage.setItem("recLS", recStr);
    favStr = recToStr(dictionary_favourites);
    localStorage.setItem("favLS", favStr);
};

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
        var fav = parseInt(line.split(":")[1].split("?")[2]);

        dic[line.split(":")[0]] = [ingArray, desc, fav];
    }
    return dic;
}


function view(tr_var) {
    document.getElementById("recipeTitle").innerHTML = '<h3 class="modal-title">' + tr_var.children('td:eq(0)').text() + '</h3>';
    var strRecipe = '<div style="height: 10vh">';
    for (var i = 0; i < dictionary_favourites[tr_var.children('td:eq(0)').text()][0].length; i++){
        //console.log(dictionary_favourites[tr_var.children('td:eq(0)').text()][1]);
        //strRecipe += '<h3>' + dictionary_favourites[tr_var.children('td:eq(0)').text()][0][i] + " : " + //dictionary_products[dictionary_favourites[tr_var.children('td:eq(0)').text()][0][i]][0] + " " + //dictionary_products[dictionary_favourites[tr_var.children('td:eq(0)').text()][0][i]][1] + '</h3>';
    }
    //strRecipe += '<h3>' + dictionary_favourites[tr_var.children('td:eq(0)').text()][1] + '</h3>';
    strRecipe = dictionary_favourites[tr_var.children('td:eq(0)').text()][1];
    document.getElementById("recipeText").innerHTML = strRecipe + '</div>';
}

/*  --- Js function used everytime we update the table ---
It uses an array to fill in each row
*/
function getTable() {
    for (var key in dictionary_recipes) {
        if (dictionary_recipes[key][2] == 1) {
            dictionary_favourites[key] = dictionary_recipes[key];
            var div = $("<tr />");
            div.html(GetDynamicTextBox(key));
            $("#TextBoxContainer").append(div);
        }
    }
}


$(function () {
    $("body").on("click", ".remove", function () {
        delete dictionary_favourites[$(this).closest("tr").children('td:eq(0)').text()];
        dictionary_recipes[$(this).closest("tr").children('td:eq(0)').text()][2] = 0;
        $(this).closest("tr").remove();
    });
    $("body").on("click", ".view", function () {
        view($(this).closest("tr"));
    });

});

function GetDynamicTextBox(element) {
    return '<td style="width:37.5%">' + element + '</td>' +
        '<td style="text-align:center; width:37.5%" ><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-sm view ">VIEW</button></td>' +
        '<td style="text-align:center; width:25%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}

function goFullscreen() {
    var modalTitle = document.getElementById("fullScreenTitle");
    var modalText = document.getElementById("fullScreenText");
    modalTitle.innerHTML = document.getElementById("recipeTitle").textContent;
    modalText.innerHTML = '<div style="height: 70vh; overflow: auto;">' + document.getElementById("recipeText").innerHTML + '</div>' + '<div><button type="button" class="col-xs-offset-4 col-xs-4 btn btn-primary" data-dismiss="modal">Exit</button></div><br /><br />';
}
