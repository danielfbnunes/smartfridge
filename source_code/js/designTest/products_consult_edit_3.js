$(document).ready(function () {
    //Start Datepicker
    $("#expDate").datepicker();
    //set the products table height
    document.getElementById("TextBoxContainer").style.height = (window.innerHeight - ($('th').eq(0).height() + $('tr').eq(0).height() + $('tr').eq(1).height() + $("#TextBoxContainer").position().top)) + "px";
    //get the products from database

    //get dict from localStorage
    /*
    var prodDBTESTE = { "prodName1":[2,"embalagens", "05/09/2017", "bbb"], "prodName2":[3,"kg","05/01/2018", "aaaaa"] , "prodName3":[10,"pacotes","31/12/2018", "cccc"] };
    var prodStr = prodToStr(prodDBTESTE);
    
    localStorage.setItem("prodLS", prodStr);
*/
    console.log(localStorage.getItem("prodLS"));

    prodDB = prodToDic(localStorage.getItem("prodLS"));


    //loadTable
    getTable(prodDB);
});




var prodDB;

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




//Used to edit a a product
function edit(tr_var) {
    var new_dict = {};
    //get Data
    var pName = tr_var.children('td:eq(0)').text();
    var quant = prodDB[pName][0];
    var quantDesc = prodDB[pName][1];
    var expDate = prodDB[pName][2];
    var comments = prodDB[pName][3];

    console.log(prodDB[pName]);
    var prevPname = pName;

    //update Modal
    document.getElementById("new_product_name").value = pName;
    document.getElementById("new_quantity").value = quant + " " + quantDesc;
    document.getElementById("new_expDate").value = expDate;
    document.getElementById("new_comments").textContent = comments;

    $("#myModal").modal();

    $("#btnConfirm").bind("click", function () {

        //getValues
        pName = document.getElementById("new_product_name").value;
        quant = document.getElementById("new_quantity").value.replace(/  +/g, ' ').split(" ")[0];
        quantDesc = document.getElementById("new_quantity").value.replace(/  +/g, ' ').split(" ")[1];

        if (quantDesc === undefined)
            quantDesc = "";

        quant = parseInt(quant) || 1;
        
        expDate = document.getElementById("new_expDate").value;
        comments = document.getElementById("new_comments").textContentM;

        //update dictionary
        //update dictionary
        var keys = Object.keys(prodDB);
        var index = keys.indexOf(prevPname);
        keys[index] = pName;

        for (i = 0; i < keys.length; i++) {
            if (pName == keys[i])
                new_dict[keys[i]] = [parseInt(quant), quantDesc, expDate, comments];
            else
                new_dict[keys[i]] = [prodDB[keys[i]][0], prodDB[keys[i]][1], prodDB[keys[i]][2], prodDB[keys[i]][2]];
        }
        prodDB = new_dict;
        prodStr = prodToStr(prodDB);
        getTable(prodDB);
        
        localStorage.setItem("prodLS", prodStr);
    });
}


//Used to update the table, given a dictionary
function getTable(dict) {
    $("#TextBoxContainer").empty();

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
        delete prodDB[pName];
        $(this).closest("tr").remove();
        prodStr = prodToStr(prodDB);
        localStorage.setItem("prodLS", prodStr);
    });
    $("body").on("click", ".edit", function () {
        edit($(this).closest("tr"));
    });
});


function GetDynamicTextBox(element, quant) {
    return '<td class="col-xs-4" style="width:32.5%" id="productName">' + element + '</td>' +
        '<td class="col-xs-3" style="width:32.5%">' + quant + '</td>' +
        '<td class="col-xs-3" style="text-align:center; width:17.5%;" ><button style="color:white" type="button" class="btn btn-custom btn-sm edit ">EDIT</button></td>' +
        '<td class="col-xs-2" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}