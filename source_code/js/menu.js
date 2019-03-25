
window.onresize = function (event) { resizeMenu(); };

function resizeMenu() 
{
    //set heigh  + define array with IDs
    var elemHeight = Math.floor(document.getElementById("groc").clientWidth * 3 / 4);
    var elemIds = ["groc", "prod", "rec", "notes", "tv", "spot", "warn", "sett"];

    //set div height
    for (i = 0; i < elemIds.length; i++) {
        document.getElementById(elemIds[i]).style.height = elemHeight + "px";
        document.getElementById(elemIds[i] + "Text").style.lineHeight = elemHeight + "px";
    }

    //get occupied high
    var occupiedHeight = 4 * elemHeight + 5 * 0.02 * elemHeight;

    //set body padding to center the menu
    document.body.style.paddingTop = (window.innerHeight - occupiedHeight) / 3 + "px";

    //center text of the groccery list
    document.getElementById("grocText").style.lineHeight = elemHeight / 2 + "px";
}

var timeout = null;

$(document).load('mousemove', function() {
    if (timeout !== null) {
        $(document.body).text('');
        clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
        window.location = "locked_screen.html";
    }, 10000);
});