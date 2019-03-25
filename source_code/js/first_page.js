function myFunction() {
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

var barCodeStr="";

function test(barCodeDB) 
{
    var barCodeDB = {1: "prodName1", 2: "prodName2", 3: "prodName3" };
    var keys = Object.keys(barCodeDB);
    
    for (i = 0; i < keys.length ; i++) 
    {
        barCodeStr += keys[i] + ":" + barCodeDB[keys[i]];

        if (i < keys.length - 1)
            barCodeStr += "|";
    }
}

function testReverse(barCodeStr)
{
    var line;
    dic = {};
    console.log(barCodeStr.split("|"));
    var arraySplited = barCodeStr.split("|");
    for (i = 0; i < arraySplited.length ; i++) 
    {
        line = arraySplited[i];
        dic[line.split(":")[0]] = line.split(":")[1];
    }
    console.log(dic);
}


var prodStr="";
function test(prodDB) 
{
    var prodDB = { "prodName1":[2,"embalagens"], "prodName2":[3,"kg"] , "prodName3":[10,"pacotes"] };
    console.log(prodDB);
    var keys = Object.keys(prodDB);
    
    for (i = 0; i < keys.length ; i++) 
    {
        prodStr += keys[i] + ":" + prodDB[keys[i]][0] + "," + prodDB[keys[i]][1]  ;

        if (i < keys.length - 1)
            prodStr += "|";
    }
    console.log(prodStr);
}


function testReverse()
{
    var line;
    dic = {};
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length ; i++) 
    {
        line = arraySplited[i];
        dic[line.split(":")[0]] = [ parseInt(line.split(":")[1].split(",")[0]), line.split(":")[1].split(",")[1]];
    }
    console.log(dic);
}


var recipeStr="";
function test() 
{
    var grocDB = { "recipe1":[["ing1", "ing2", "ing3"],"desc1", 0], "recipe2":[["ing21", "ing22", "ing23"],"desc2", 1] };
    console.log(grocDB);
    var keys = Object.keys(grocDB);
   
    for (i = 0; i < keys.length ; i++) 
    {
        var recName =  keys[i];
        var ingredients = grocDB[keys[i]][0]; 
        var descrp =  grocDB[keys[i]][1];
        var fav =  grocDB[keys[i]][2];
        
        recipeStr += recName + ":";
    
        for (i2 = 0; i2 < ingredients.length ; i2++) 
        {
            if (i2 < ingredients.length - 1)
                recipeStr += ingredients[i2] + ";";
            else
                recipeStr += ingredients[i2];
        }
        recipeStr += "," + descrp + "," + fav;
        
        if (i < keys.length - 1)
            recipeStr += "|";
    }
    console.log(recipeStr);
}

function testReverse()
{
    var line;
    dic = {};
    var arraySplited = recipeStr.split("|");
    for (i = 0; i < arraySplited.length ; i++) 
    {
        line = arraySplited[i];
        
        var ingArray = line.split(":")[1].split(",")[0].split(";");
        var desc = line.split(":")[1].split(",")[1];
        var fav = parseInt(line.split(":")[1].split(",")[2]);
        
        dic[line.split(":")[0]] = [ingArray, desc,fav];
    }
    console.log(dic);
}