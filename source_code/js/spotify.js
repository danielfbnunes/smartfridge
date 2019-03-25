window.onresize = function (event) { setHeight(); };
window.onload = function (event) { setHeight(); };

function setHeight() 
{
    //set heigh  + define array with IDs
    var height = document.getElementById("navbar").clientHeight;
    console.log(height);
    console.log(window.innerHeight)
    document.getElementById("spotifyInterface").style.height = window.innerHeight - height + "px" ;
}   