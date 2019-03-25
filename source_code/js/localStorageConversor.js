
var barCodeStr="";

function barCodeToStr(........) 
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

function barCodeToDic(....)
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
    return dict;
}


var prodStr="";
function prodToStr(..dic..) 
{
    var prodDB = { "prodName1":[2,"embalagens", "05/09/2017", "bbb"], "prodName2":[3,"kg","05/01/2018", "aaaaa"] , "prodName3":[10,"pacotes","31/12/2018", "cccc"] };
    console.log(prodDB);
    var keys = Object.keys(prodDB);
    
    for (i = 0; i < keys.length ; i++) 
    {
        prodStr += keys[i] + ":" + prodDB[keys[i]][0] + "," + prodDB[keys[i]][1] + "," + prodDB[keys[i]][2] + ","  +prodDB[keys[i]][3] ;

        if (i < keys.length - 1)
            prodStr += "|";
    }
    console.log(prodStr);
}


function prodToDic(....)
{
    var line;
    dic = {};
    var arraySplited = prodStr.split("|");
    for (i = 0; i < arraySplited.length ; i++) 
    {
        line = arraySplited[i];
        dic[line.split(":")[0]] = [ parseInt(line.split(":")[1].split(",")[0]), line.split(":")[1].split(",")[1], line.split(":")[1].split(",")[2], line.split(":")[1].split(",")[3]];
    }
    console.log(dic);
}


var recipeStr="";
function recToStr(....) 
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

function recToDic(....)
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