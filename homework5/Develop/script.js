
$(document).ready(function () {
console.log(moment());
$("#currentDay").text(moment().format("dddd MMMM Do YYYY"));

});

// var hours = [];
// for( var i=9; i<12; i++ ) {
//     hours.push(i+"AM");
// }
// hours.push("12PM")
// for(var i=1; i<6; i++) {
//     hours.push(i+ "PM");
// }
// console.log(hours);

var date = new Date;
var hour = date.getHours();

var pastHours = [],
    futureHours = [];
for( var i=9; i<hour; i++ ) {
    if (i>=13){
        if (i-12>=10){
            pastHours.push(i-12 + ":00");    
        }
        else{
            pastHours.push(i-12 + ":00  ");
        } 
    }
    else{
        if (i >=10){
        pastHours.push(i+":00");   
        }
        else{
            pastHours.push(i+":00  ");
        }
    }
}
for(var i=hour; i<18; i++) {
  if (i>=13){
    futureHours.push(i-12 + ":00  ");   
    }
    else{
        if (i >=10){
            futureHours.push(i+":00");   
        }
        else{
            futureHours.push(i+":00  ");
        }
    }
}

console.log(pastHours);
console.log(futureHours);

for (let index = 0; index < pastHours.length; index++) {
    var element = pastHours[index];
    $(".container").append("<div class = 'description text-block row past'><div class = 'hour'>" + element + "</div><textarea id = 'event_past_"+index+"'></textarea><button class='saveBtn'><i>save</i></button></div>");
}
for (let index = 0; index < futureHours.length; index++) {
    var element = futureHours[index];
    var currentHour = "future";
    if (index == 0){
        currentHour = "present";
    }
    $(".container").append("<div class = 'description text-block row "+currentHour+"'><div class = 'hour'>" + element + "</div><textarea id = 'event_future_"+index+"'></textarea><button class='saveBtn'><i>save</i></button></div>");
}