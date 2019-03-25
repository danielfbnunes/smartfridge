    $(document).ready(function () {
    //Start Datepicker
    $("#expDate").datepicker();
    //set the products table height
    var textBoxHeight = window.innerHeight - $("#headerTable").height() - $("#productsTableHeader").height() - $("#insertManuallyDiv").height();
    document.getElementById("TextBoxContainer").style.height = textBoxHeight + "px";
    /*
    var dict = {
        "Exp. Date Milk": "Milk's expiration date is coming in 2 days.",
        "Temperature": "The temperature is too high!",
    };
    localStorage.setItem("warnLS", warnToStr(dict));
    */
    warnDB = warnToDic(localStorage.getItem("warnLS"));
    wishDB = wishToDic(localStorage.getItem("watchLS"));
    prodDB = prodToDic(localStorage.getItem("prodLS"));
    console.log(wishDB);
    console.log(prodDB);
    loadWatchList(wishDB);
    getTable(warnDB);
});


localStorage.removeItem('dict');
var warnDB = {};
var wishDB = {};
var prodDB = {};


window.onbeforeunload = function () {

    warnStr = warnToStr(warnDB);
    localStorage.setItem("warnLS", warnStr);

};

function loadWatchList(wishDB) {

    var keys = Object.keys(wishDB);
    console.log(keys);
    for (i = 0; i < keys.length; i++) {

        if (prodDB[keys[i]] === undefined)
            warnDB["Running low: " + keys[i]] = "The " + keys[i] + " is running low.";

        else if (prodDB[keys[i]] !== undefined) {
            var wishQuant = parseInt(wishDB[keys[i]]);
            var prodQuant = parseInt(prodDB[keys[i]][0]);
            if (wishQuant > prodQuant)
                warnDB["Running low: " + keys[i]] = "The " + keys[i] + " is running low.";
        }
    }
}



//converts a dictionary to a String which can be saved in localStorage.
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



//converts a string into a dictionary
function warnToDic(prodStr) {
    console.log(prodStr);
    var line;
    dic = {};
    if (prodStr != "") {
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        var quantDesc;
        line = arraySplited[i];

        dic[line.split("?")[0]] = line.split("?")[1];
    }
    }
    console.log(dic);
    return dic;
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

function edit(tr_var) {
    $("#note_name").val(tr_var.children('td:eq(0)').text());
    $("#myModal").modal();
    $("#btnChange").bind("click", function () {
        //update graphical interface
        tr_var.children('td:eq(0)').html($("#note_name").val());
    });
}

/*  --- Js function used everytime we update the table ---
It uses an array to fill in each row
*/
function getTable(dict) {
    for (var key in dict) {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(key));
        $("#TextBoxContainer").append(div);
    }
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

$(function () {
    $("body").on("click", ".remove", function () {
        delete warnDB[$(this).closest("tr").children('td:eq(0)').text()];
        $(this).closest("tr").remove();
    });
    $("body").on("click", ".edit", function () {
        edit($(this).closest("tr"));
    });

});

function GetDynamicTextBox(element) {
    return '<td class="col-xs-4" style="width:65%" >' + element + '</td>' +
        '<td class="col-xs-3" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-primary btn-sm edit" onclick="openWarning( $(this).closest (\'tr\'))"><i class="fa fa-eye" aria-hidden="true"></i></button></td>' +
        '<td class="col-xs-2" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-success btn-sm remove"><i class="fa fa-check" aria-hidden="true"></i></button></td>'
}

//Used to convert the dictionary to a string
//alows that a dictionary stays in localStorage
function saveDictToString() {
    var string = "";
    for (var key in dict) {
        string += key + ":" + dict[key] + "|";
    }
    console.log(string);
    localStorage.setItem("dict", string);
}

//Used to reveal the confirm and cancel buttons
function revealButtons() {
    document.getElementById("insertManuallyButton").style.marginBottom = "1.75vh";
    document.getElementById("insertManuallyButton").style.marginTop = "1.75vh";
    document.getElementById("cancelButton").style.display = "block";
    document.getElementById("confirmButton").style.display = "block";
}

$(function () {
    $("#btnConfirm").bind("click", function () {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(document.getElementById('nName').value));
        $("#TextBoxContainer").append(div);
    });
    $("body").on("click", ".remove", function () {
        $(this).closest("tr").remove();
        console.log(warnDB);
    });
});

function openWarning(title) {
    title = title.children('td:eq(0)').text();
    //show modal
    $('#warningsModal').modal('show');

    //change modal title
    document.getElementById("warningTitle").textContent = title;

    //change text
    document.getElementById("viewNoteText").textContent = warnDB[title];
}

function remove() {
    $("#TextBoxContainer").find("tr").remove();
    warnDB = {};
}