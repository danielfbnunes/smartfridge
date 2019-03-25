$(document).ready(function () {

    /*
    localStorage.removeItem("prodLS");
    localStorage.removeItem("watchLS");

    dictionary_products = { "ing1": [2, "kg", "", ""], "ing2": [500, "g", "", ""], "ing3": [2, "L", "", ""], "ing21": [2, "L", "", ""], "ing23": [2, "L", "", ""] };
    localStorage.setItem("prodLS", prodToStr(dictionary_products));
    
    
   dictionary_watchlist = {};
   localStorage.setItem("watchLS", wishToStr(dictionary_watchlist));
    */

    console.log(localStorage.getItem("watchLS"));
    console.log(localStorage.getItem("prodLS"));
    dictionary_watchlist = wishToDic(localStorage.getItem("watchLS"));
    dictionary_products = prodToDic(localStorage.getItem("prodLS"));
    console.log(dictionary_watchlist);

    getVals();

})


window.onbeforeunload = function () {

    prodStr = prodToStr(dictionary_products);
    localStorage.setItem("prodLS", prodStr);
    wishStr = wishToStr(dictionary_watchlist);
    localStorage.setItem("watchLS", wishStr);

};

var prodDB;
var watchListDB;

var removeBool = false;




$(function () {
    $("#btnAdd").bind("click", function () {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(""));
        $("#TextBoxContainer").append(div);
    });
    $("body").on("click", ".remove", function () {
        //open modal
        $('#removeModal').modal('show');
        lastTrUsed = $(this).closest("tr")
    });
});

var lastTrUsed;

function removeWish(remFromList) {
    tr = lastTrUsed;

    if (remFromList) {
        var pName = tr.children('td:eq(0)').text();
        console.log(pName);
        console.log(dictionary_watchlist[pName]);
        delete dictionary_watchlist[pName];
    }

    tr.remove()
    console.log(dictionary_watchlist);
}


function GetDynamicTextBox(value) {
    return '<td><input name = "DynamicTextBox" type="text" value = "' + value + '" class="form-control" /></td>' + '<td><input type="number" name="quantity" min="1"></td>' + '<td><button type="button" class="btn btn-danger remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
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

function wishToDic(prodStr) {
    var line;
    dic = {};

    if (prodStr == "")
        return {};

    var arraySplited = prodStr.split("|");
    console.log(arraySplited);
    for (i = 0; i < arraySplited.length; i++) {
        line = arraySplited[i];
        dic[line.split(":")[0]] = parseInt(line.split(":")[1]);
    }
    return dic;
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



//converts a string into a dictionary
function prodToDic(prodStr) {
    console.log(prodStr);
    var line;
    dic = {};
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        var quantDesc;
        line = arraySplited[i];

        if (line.split(":")[1].split(",").length <= 0)
            quantDesc = "";
        else
            quantDesc = line.split(":")[1].split(",")[1];

        dic[line.split(":")[0]] = [parseInt(line.split(":")[1].split(",")[0]), quantDesc, line.split(":")[1].split(",")[2], line.split(":")[1].split(",")[3]];
    }
    return dic;
}


function GetDynamicTextBox(value) {
    return '<td style="width:30%; text-align:center" ><input id="temp_input" name = "DynamicTextBox" type="text" value ="" class="form-control"/></td>' +
        '<td style="width:38%" ;text-align:center"><input id="temp_quantity" type="text" name="quantity" min="1"  class="col-xs-8 form-control" /></td>' +
        '<td style=" width:16% text-align:center" > <button type="button" class="btn btn-primary" btn-sm" onclick="addGL(this)"><i class="glyphicon glyphicon-ok"></i></button></td>' +
        '<td style=" width:16%  text-align:center"> <button type="button" class="btn btn-danger btn-sm" onclick="removeGroc(this)"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}

function GetDynamicTextBox_no_wishlist(value, quantity, type_quant) {
    return '<td style="width:30%;     font-weight: normal;"><label name = "DynamicTextBox">' + value + '</label></td>' +
        '<td style="width:54%" class="col-xs-12"><input type="number" name="quantity" value="' + quantity + '" class="col-xs-6" />&nbsp<label style="width:40%;">' + type_quant + '</label></td>' +
        '<td style="text-align:center; width:16%" ><button type="button" class="btn btn-danger btn-sm" onclick="removeGroc(this)"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}

function removeGroc(temp) {
    console.log("dsadsadsad");
    $(temp).closest("tr").remove();
}

function addGL(temp) {
    var div = $("<tr />");
    var text = document.getElementById("temp_input").value;
    var quant = document.getElementById("temp_quantity").value;
    var arrayTemp = quant.split(" ");
    if (arrayTemp.length == 1) {
        div.html(GetDynamicTextBox_no_wishlist(text, quant, "unit"));
    } else {
        div.html(GetDynamicTextBox_no_wishlist(text, arrayTemp[0], arrayTemp[1]));

    }
    $("#TextBoxContainer").append(div);
    removeGroc(temp);

}

$(document).ready(function () {
    $('[id^=phone]').keypress(validate);
});

function validate(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
};

function GetDynamicTextBox_wishlist(value, quantity, type_quant) {
    return '<td style="width:30%;     font-weight: normal;"><label name = "DynamicTextBox">' + value + '</label></td>' +
        '<td style="width:54%" class="col-xs-12"><input type="number" name="quantity" value="' + quantity + '" class="col-xs-6" />&nbsp<label style="width:40%;">' + type_quant + '</label></td>' +
        '<td style="text-align:center; width:16%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}


function checkProd() {
    var product_name = document.getElementById("product_name").value;
    var bool = false;
    for (var key in dictionary_products) {
        console.log(product_name + "==" + key);
        if (product_name == key) {
            bool = true;
        }
    }
    console.log(bool);
    if (bool) {
        $('#myModal2').modal('hide');
        var test = false;
        if(dictionary_watchlist[product_name] === undefined)
            test = true;
        dictionary_watchlist[product_name] = document.getElementById("min_quantity").value;
        console.log(dictionary_watchlist);
        getVals();
    } else {
        $("#errorModal").modal('show');
    }

}

function getVals() {
    var div = $("#TextBoxContainer");
    $("#TextBoxContainer").empty();
    console.log(dictionary_watchlist);

    for (var key in dictionary_watchlist) {

        if (dictionary_products[key][0] === undefined) {
            var div = $("<tr />");
            div.html(GetDynamicTextBox_wishlist(key, dictionary_watchlist[key], dictionary_products[key][1]));
            $("#TextBoxContainer").append(div);
        } else {
            var wishQuant = parseInt(dictionary_watchlist[key]);
            var prodQuant = parseInt(dictionary_products[key][0]);
            console.log(dictionary_watchlist[key]);
            console.log(dictionary_products[key][0]);
            if (wishQuant > prodQuant) {
                console.log(dictionary_products[key]);
                var div = $("<tr />");
                div.html(GetDynamicTextBox_wishlist(key, wishQuant - prodQuant, dictionary_products[key][1]));
                $("#TextBoxContainer").append(div);
            }

        }
    }
}

function getTable(dict) {
    var div = $("#TextBoxContainer");

    $("#TextBoxContainer").empty();

    console.log(dict);
    var keys = Object.keys(dict);

    for (i = 0; i < keys.length; i++) {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(keys[i], dict[keys[i]][0] + " " + dict[keys[i]][1]));
        $("#TextBoxContainer").append(div);
    }
}

function removeAll() {
    $("#TextBoxContainer").empty();
    dictionary_watchlist = {};
}