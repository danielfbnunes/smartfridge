$(document).ready(function () {
    //Start Datepicker
    $("#new_expDate").datepicker();
    //set the products table height
    var textBoxHeight = window.innerHeight - $("#headerTable").height() - $("#productsTableHeader").height() - $("#insertManuallyDiv").height();
    document.getElementById("TextBoxContainer").style.height = textBoxHeight + "px";
    barCodeDB = barCodeToDic(localStorage.getItem("barCodeLS"));

    prodDB = prodToDic(localStorage.getItem("prodLS"));
    console.log(prodDB);

    //show modal for bar code input
    $('#inputBarCode').modal('show');

});

dict = {};
var barCodeDB;
var prodDB;


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


function barCodeToDic(barCodeStr) {
    var line;
    dic = {};
    if (barCodeStr != "") {
        var arraySplited = barCodeStr.split("|");
        for (i = 0; i < arraySplited.length; i++) {
            line = arraySplited[i];
            dic[line.split(":")[0]] = line.split(":")[1];
        }
    }
    return dic;
}

//converts a string into a dictionary
function prodToDic(prodStr) {
    console.log(prodStr);
    var line;
    dic = {};
    if (prodStr != "") {
        var arraySplited = prodStr.split("|");
        for (i = 0; i < arraySplited.length; i++) {
            line = arraySplited[i];
            dic[line.split(":")[0]] = [parseInt(line.split(":")[1].split(",")[0]), line.split(":")[1].split(",")[1], line.split(":")[1].split(",")[2], line.split(":")[1].split(",")[3]];
        }
    }
    return dic;
}


//converts a dictionary to a String which can be saved in localStorage.
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

function takeManuallyButton() {
    $('#removeProductManually').modal('show');
    $('#inputBarCode').modal('hide');
    $('#removeProduct').modal('hide');
}

function takeFromBarCode() {
    //getValues
    console.log(dict);
    barCode = document.getElementById("new_bar_code").value;


    if (checkExist(barCodeDB[barCode])) {
        document.getElementById("barCodeError").style.display = "none";
        document.getElementById("productError").style.display = "none";

        console.log(barCode);

        //get product name
        var pName = barCodeDB[barCode];

        if (dict[pName] === undefined)
            dict[pName] = [1, " ", " ", " "];
        else
            dict[pName] = [parseInt(dict[pName]) + 1, " ", " ", " "];

        console.log(dict);
        getTable(dict);
        revealButtons();
    } else {
        document.getElementById("barCodeError").style.display = "block";
    }
}

function take() {
    //getValues
    pName = document.getElementById("product_name").value;
    quantityPlusDesc = document.getElementById("quantity").value;
    quantityPlusDesc = quantityPlusDesc.replace(/  +/g, ' ');

    quant = quantityPlusDesc.split(" ")[0];
    quantDesc = quantityPlusDesc.split(" ")[1];

    if (pName != "") {

        if (quantDesc === undefined)
            quantDesc = "";

        quant = parseInt(quant) || 1;

        dict[pName] = [parseInt(quant), desc, " "];
        getTable(dict);
        revealButtons();
    }
}


//global variable
var prevPname;
var lastTrSelected;
//Used to edit a a product

function edit(tr_var) {
    prevPname = tr_var.children('td:eq(0)').text();
    lastTrSelected = tr_var;
    document.getElementById("product_name").value = tr_var.children('td:eq(0)').text()
    document.getElementById("quantity").value = tr_var.children('td:eq(1)').text()
}


function updateTableAndDict() {

    console.log("lahsfl");
    var new_dict = {};

    //getValues
    pName = document.getElementById("product_name").value;
    quantityPlusDesc = document.getElementById("quantity").value;
    quantityPlusDesc = quantityPlusDesc.replace(/  +/g, ' ');

    quant = quantityPlusDesc.split(" ")[0];
    quantDesc = quantityPlusDesc.split(" ")[1];
    
    quant = parseInt(quant) || 1;

    

    if (checkExist(pName)) {

        //update Table
        lastTrSelected.children('td:eq(0)').text(pName);
        lastTrSelected.children('td:eq(1)').text(quant + " " + quantDesc);

        //update dictionary
        var keys = Object.keys(dict);
        console.log(keys);

        var index = keys.indexOf(prevPname);
        keys[index] = pName

        for (i = 0; i < keys.length; i++) {
            if (pName == keys[i])
                new_dict[keys[i]] = [parseInt(quant), "", "", ""];
            else
                new_dict[keys[i]] = [parseInt(quant), dict[keys[i]][1], dict[keys[i]][2], dict[keys[i]][2]];
        }
        dict = new_dict;
    }
    console.log(dict);
}

function addTableAndDict() {
    //getValues
    pName = document.getElementById("product_name_manual").value;
    quant = document.getElementById("quantity_manual").value.split(" ")[0];
    quantDesc = document.getElementById("quantity_manual").value.split(" ")[1];


    if (checkExist(pName)) {
        document.getElementById("productError").style.display = "none";
        document.getElementById("barCodeError").style.display = "none";

        if (quantDesc === undefined)
            quantDesc = "";

        quant = parseInt(quant) || 1;


        if (dict[pName] === undefined)
            dict[pName] = [quant, "", "", ""];
        else
            dict[pName] = [parseInt(dict[pName]) + parseInt(quant), " ", " ", " "];
        getTable(dict);
        $('#removeProductManually').modal('hide');
        $('#removeProduct').modal('hide');
        $('#inputBarCode').modal('show');
    } else {
        document.getElementById("productError").style.display = "block";
    }
    document.getElementById("product_name_manual").value = "";
    document.getElementById("quantity_manual").value = "";
    console.log(dict);
}

/*  --- Js function used everytime we update the table ---
It uses an array to fill in each row
*/
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


$(function () {
    $("body").on("click", ".remove", function () {
        var pName = $((this).closest("tr")).children('td:eq(0)').text();
        delete dict[pName];
        $(this).closest("tr").remove();
        console.log(dict);
    });
    $("body").on("click", ".edit", function () {
        edit($(this).closest("tr"));
        $('#removeProduct').modal('show');
        document.getElementById("productErrorEdit").style.display = "none";
    });
});


function GetDynamicTextBox(element, quant) {
    return '<td class="col-xs-4" style="width:32.5%">' + element + '</td>' +
        '<td class="col-xs-3" style="width:32.5%">' + quant + '</td>' +
        '<td class="col-xs-3" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-primary btn-sm edit " ">EDIT</button></td>' +
        '<td class="col-xs-2" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}



//Used to reveal the confirm and cancel buttons
function revealButtons() {
    document.getElementById("takeManuallyButton").style.marginBottom = "1.75vh";
    document.getElementById("takeManuallyButton").style.marginTop = "1.75vh";
    document.getElementById("cancelButton").style.display = "block";
    document.getElementById("confirmButton").style.display = "block";
}


function checkExist(pName) {
    if (prodDB[pName] === undefined)
        return false;
    return true;
}

function updateData() {
    var keys = Object.keys(dict);

    for (i = 0; i < keys.length; i++) {
        console.log(prodDB);

        //check if quantity removed  is bigger than quantity that exist
        if (prodDB[keys[i]] === undefined || parseInt(prodDB[keys[i]][0]) - parseInt(dict[keys[i]][0]) <= 0)
            delete prodDB[keys[i]];
        else
            prodDB[keys[i]] = [parseInt(prodDB[keys[i]][0]) - parseInt(dict[keys[i]][0]), prodDB[keys[i]][1], prodDB[keys[i]][2], prodDB[keys[i]][3]];
    }
    prodStr = prodToStr(prodDB);
    localStorage.setItem("prodLS", prodStr);
    prodDB = prodToDic(localStorage.getItem("prodLS"));
}