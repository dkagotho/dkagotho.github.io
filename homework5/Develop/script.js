
$(document).ready(function () {
console.log(moment());
$("#currentDay").text(moment().format("dddd MMMM Do YYYY"));

});


var hours = [];
for( var i=9; i<12; i++ ) {
    hours.push(i+"AM");
}
hours.push("12PM")
for(var i=1; i<6; i++) {
    hours.push(i+ "PM");
}
console.log(hours);
