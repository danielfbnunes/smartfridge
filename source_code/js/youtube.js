videos = ["https://www.youtube.com/embed/XFkzRNyygfk", "https://www.youtube.com/embed/tgbNymZ7vqY", "https://www.youtube.com/embed/s88r_q7oufE"];

var index;
var flag = true;
var len = videos.length;

function getPrev(link) {
    if (flag) {
        index = videos.indexOf(link);
        flag = false;
        index -= 1;
    }

    var newLink;

    if (index - 1 < 0)
        index = len - 1;
    else
        index -= 1;

    newLink = videos[index];
    document.getElementById(link).src = newLink;
}

function getNext(link) {
    if (flag) {
        index = videos.indexOf(link);
        flag = false;
        index += 1;
    }

    var newLink;
    if (index + 1 >= len)
        index = 0;
    else
        index += 1;

    newLink = videos[index];
    document.getElementById(link).src = newLink;
}