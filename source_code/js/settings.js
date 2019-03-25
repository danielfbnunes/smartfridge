function getDate() {
    var d = new Date();
    document.getElementById("day").value = d.getDate();
    document.getElementById("month").value = d.getMonth();
    document.getElementById("year").value = d.getFullYear();
    document.getElementById("hours").value = d.getHours();
    document.getElementById("minutes").value = d.getMinutes();
}


    