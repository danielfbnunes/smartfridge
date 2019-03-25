$(document).ready(function () {
    var dict_warnings = warnToDic(localStorage.getItem("warnLS"));
    var dict_notes = notesToDic(localStorage.getItem("notesLS"));
    var i = 0;
    console.log(dict_warnings);
    for (var key in dict_warnings) {
        var div;
        if (i == 0) {
            div = $('<div class="item active col-xs-10 col-xs-offset-1 "><p>' + dict_warnings[key] + '</p></div>');
        } else {
            div = $('<div class="item col-xs-10 col-xs-offset-1 "><p>' + dict_warnings[key] + '</p></div>');
        }
        i++;
        $("#getWarnings").append(div);
    }

    i = 0;
    for (var key in dict_notes) {
        var div;
        if (i == 0) {
            div = $('<div class="item active col-xs-10 col-xs-offset-1 "><p>' + dict_notes[key] + '</p></div>');
        } else {
            div = $('<div class="item col-xs-10 col-xs-offset-1 "><p>' + dict_notes[key] + '</p></div>');
        }
        i++;
        $("#getNotes").append(div);
    }
})

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

function warnToDic(prodStr) {
    console.log(prodStr);
    var line;
    dic = {};
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length; i++) {
        var quantDesc;
        line = arraySplited[i];

        dic[line.split("?")[0]] = line.split("?")[1];
    }
    console.log(dic);
    return dic;
}

function getDate() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var n = weekday[d.getDay()];
    document.getElementById("demo").innerHTML = n + " " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2);
}
