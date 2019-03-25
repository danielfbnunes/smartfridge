$(document).ready(function () {
    //Start Datepicker
     $(function () {
        $('#new_expDate').datepicker({
            format: "dd/mm/yyyy",
            language: "en",
            autoclose: true,
            todayHighlight: true
        });
    });
    $(function () {
        $('#new_expDate_add').datepicker({
            format: "dd/mm/yyyy",
            language: "en",
            autoclose: true,
            todayHighlight: true
        });
    });
    //set the products table height
    var textBoxHeight = window.innerHeight - $("#headerTable").height() - $("#productsTableHeader").height() - $("#insertManuallyDiv").height();
    document.getElementById("TextBoxContainer").style.height = textBoxHeight + "px";
    /*
    var teste = {
        1: "prodName1",
        2: "prodName2",
        3: "prodName3"
    };
    barCodeStr = barCodeToStr(teste);
    localStorage.setItem("barCodeLS", barCodeStr);
    */
    barCodeDB = barCodeToDic(localStorage.getItem("barCodeLS"));

    prodBD = prodToDic(localStorage.getItem("prodLS"));


    //show modal for bar code input
    $('#inputBarCode').modal('show');

});

dict = {};
var barCodeDB;
var prodBD;




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


//converts a string into a dictionary
function prodToDic(prodStr) {

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

//global variable
var prevPname;
var lastTrSelected;
//Used to edit a a product
function edit(tr_var) {
    //get Data
    var pName = tr_var.children('td:eq(0)').text();

    console.log(pName);
    //get Data
    var quant = dict[pName][0];
    var quantDesc = dict[pName][1];
    var expDate = dict[pName][2];
    var comments = dict[pName][3];

    prevPname = pName;
    lastTrSelected = tr_var;

    //update Modal
    document.getElementById("new_product_name").value = pName;
    document.getElementById("new_quantity").value = quant + " " + quantDesc;
    document.getElementById("new_expDate").value = expDate;
    document.getElementById("new_comments").textContent = comments;
    console.log("here");
    $('#editModal').modal();

}

function updateTableAndDict() {
    var new_dict = {};

    //getValues
    pName = document.getElementById("new_product_name").value;
    quant = document.getElementById("new_quantity").value.replace(/  +/g, ' ').split(" ")[0];
    quantDesc = document.getElementById("new_quantity").value.replace(/  +/g, ' ').split(" ")[1];
    expDate = document.getElementById("new_expDate").value;
    comments = document.getElementById("new_comments").textContent;

    console.log(prevPname);
    console.log(pName);

    if (quantDesc === undefined)
        quantDesc = "";

    quant = parseInt(quant) || 1;

    //update Table
    lastTrSelected.children('td:eq(0)').text(pName);
    lastTrSelected.children('td:eq(1)').text(quant + " " + quantDesc);

    //update dictionary
    var keys = Object.keys(dict);
    var index = keys.indexOf(prevPname);
    keys[index] = pName

    for (i = 0; i < keys.length; i++) {
        if (pName == keys[i])
            new_dict[keys[i]] = [parseInt(quant), quantDesc, expDate, comments];
        else
            new_dict[keys[i]] = [dict[keys[i]][0], dict[keys[i]][1], dict[keys[i]][2], dict[keys[i]][2]];
    }
    dict = new_dict;
}

function addTableAndDict() {
    //getValues
    pName = document.getElementById("new_product_name_add").value;
    quant = document.getElementById("new_quantity_add").value.replace(/  +/g, ' ').split(" ")[0];
    quantDesc = document.getElementById("new_quantity_add").value.replace(/  +/g, ' ').split(" ")[1];
    expDate = document.getElementById("new_expDate_add").value;
    comments = document.getElementById("new_comments_add").textContent;


    if (pName != "") {

        if (quantDesc === undefined)
            quantDesc = "";

        quant = parseInt(quant) || 1;

        dict[pName] = [quant, quantDesc, expDate, comments];
        getTable(dict);
    }
}

function insert() {
    document.getElementById("barCodeError").style.display = "none";
    //getValues
    barCode = document.getElementById("new_bar_code").value;


    var pName = barCodeDB[barCode];

    if (pName !== undefined) {
        //document.getElementById("barCodeError").style.display = "block";
        if (dict[pName] === undefined)
            dict[pName] = [1, "", "", ""];
        else
            dict[pName] = [dict[pName][0] + 1, "", "", ""];
        getTable(dict);
        revealButtons();
    } else
        document.getElementById("barCodeError").style.display = "block";
}

function insertManuallyButton() {
    console.log(localStorage.getItem("prodLS"));
    $('#addModal').modal('show');
    $('#inputBarCode').modal('hide');
    document.getElementById("new_product_name_add").value = "";
    document.getElementById("new_quantity_add").value = "";
    document.getElementById("new_quantity_add").value = "";
    document.getElementById("new_expDate_add").value = "";
    document.getElementById("new_comments_add").textContent = "";
}


$(function () {
    $("body").on("click", ".remove", function () {
        var pName = $((this).closest("tr")).children('td:eq(0)').text();
        delete dict[pName];
        $(this).closest("tr").remove();
    });
    $("body").on("click", ".edit", function () {
        edit($(this).closest("tr"));

    });
});


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

function GetDynamicTextBox(element, quant) {
    return '<td class="col-xs-4" style="width:32.5%">' + element + '</td>' +
        '<td class="col-xs-3" style="width:32.5%">' + quant + '</td>' +
        '<td class="col-xs-3" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-primary btn-sm edit ">EDIT</button></td>' +
        '<td class="col-xs-2" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}

//Used to reveal the confirm and cancel buttons
function revealButtons() {
    document.getElementById("insertBarCodeButton").style.marginBottom = "1.75vh";
    document.getElementById("insertBarCodeButton").style.marginTop = "1.75vh";
    document.getElementById("cancelButton").style.display = "block";
    document.getElementById("confirmButton").style.display = "block";
}

function updateData() {
    var keys = Object.keys(dict);
    for (i = 0; i < keys.length; i++) {
        console.log(prodBD);

        if (prodBD[keys[i]] === undefined)
            prodBD[keys[i]] = dict[keys[i]];
        else
            prodBD[keys[i]] = [parseInt(prodBD[keys[i]][0]) + parseInt(dict[keys[i]][0]), dict[keys[i]][1], dict[keys[i]][2], dict[keys[i]][3]];
    }
    prodStr = prodToStr(prodBD);
    localStorage.setItem("prodLS", prodStr);
}