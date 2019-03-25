var dictionary_notes = {};

$(document).ready(function () {

    /*
    var dict = {
        "Go to dentist" : "Dentist, 22/05 at 6 pm",
        "Rent": "Pay the rent on 30/05!",
    };
    localStorage.setItem("notesLS",notesToStr(dict));
    */
    console.log(localStorage.getItem("notesLS"));

    dictionary_notes = notesToDic(localStorage.getItem("notesLS"));
    getTable();
});


window.onbeforeunload = function () {

    notesStr = notesToStr(dictionary_notes);
    localStorage.setItem("notesLS", notesStr);

};

function notesToStr(prodDB) {
    var prodStr = "";

    var keys = Object.keys(prodDB);

    for (i = 0; i < keys.length; i++) {
        prodStr += keys[i] + ":" + prodDB[keys[i]];
        if (i < keys.length - 1)
            prodStr += "|";
    }
    return prodStr;
}



//converts a string into a dictionary
function notesToDic(prodStr) {
    var line;
    dic = {};

    if (prodStr == "")
        return {};

    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        var quantDesc;
        line = arraySplited[i];

        dic[line.split(":")[0]] = line.split(":")[1];
    }
    return dic;
}


function edit(tr_var) {

    var prevName = tr_var.children('td:eq(0)').text();
    new_dict={};

    $("#note_name").val(tr_var.children('td:eq(0)').text());
    $("#note_text").val(dictionary_notes[tr_var.children('td:eq(0)').text()]);
    $("#myModal").modal();
    $("#btnChange").bind("click", function () {
        //update graphical interface
        tr_var.children('td:eq(0)').html($("#note_name").val());
        currName = document.getElementById('note_name').value;
        var new_dict = {};
        var keys = Object.keys(dictionary_notes);
        var index = keys.indexOf(prevName);
        keys[index] = currName;

        for (i = 0; i < keys.length; i++) {
            if (currName == keys[i])
                new_dict[document.getElementById('note_name').value] = document.getElementById('note_text').value;
            else
                new_dict[keys[i]] = [dictionary_notes[keys[i]]];
        }
        dictionary_notes = new_dict;
        console.log(new_dict);
        console.log(dictionary_notes);

        /*
        delete dictionary_notes[tr_var.children('td:eq(0)').text()];
        dictionary_notes[$("#note_name").val()] = $("#note_text").val();
        */
    });
}

/*  --- Js function used everytime we update the table ---
It uses an array to fill in each row
*/
function getTable() {
    for (var key in dictionary_notes) {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(key));
        $("#TextBoxContainer").append(div);
    }
}


$(function () {
    $("body").on("click", ".remove", function () {
        delete dictionary_notes[$(this).closest("tr").children('td:eq(0)').text()];
        $(this).closest("tr").remove();
    });
    $("body").on("click", ".edit", function () {
        edit($(this).closest("tr"));
    });

});

function GetDynamicTextBox(element) {
    return '<td class="col-xs-4" style="width:50%" >' + element + '</td>' +
        '<td class="col-xs-3" style="text-align:center; width:32.5%" ><button type="button" class="btn btn-primary btn-sm edit "><i class="fa fa-eye" aria-hidden="true"></i></button></td>' +
        '<td class="col-xs-2" style="text-align:center; width:17.5%" ><button type="button" class="btn btn-danger btn-sm remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}

$(function () {
    $("#btnConfirm").bind("click", function () {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(document.getElementById('nName').value));

        //div.html(GetDynamicTextBox(document.getElementById('nName').value));
        dictionary_notes[document.getElementById('nName').value] = document.getElementById('nText').value;
        //$("#TextBoxContainer").append(div);
        console.log(dictionary_notes);
        $("#TextBoxContainer").html("");;
        getTable();

        notesStr = notesToStr(dictionary_notes);
        localStorage.setItem("notesLS", notesStr);

        document.getElementById('nName').value="";
        document.getElementById('nText').value=""

        });
    $("body").on("click", ".remove", function () {
        $(this).closest("tr").remove();
    });
});

function changeTextColor(elem) {
    //changeTextColor(this)
    console.log("hasf");
    M
    console.log(elem.text);
}

function removeAll() {
    $("#TextBoxContainer").find("tr").remove();
    dictionary_notes = {};
}
