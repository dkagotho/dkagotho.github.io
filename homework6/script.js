let cities = [];
let apiKey = "d91c1db30bc07aee2930de58403de117";
let lat = "latitude";
let lon = "longitude";
let uvIndex = (lat + lon)

cities.forEach(function (city, index, originalArr) {
    renderButtons(city);

    if (index === originalArr.length - 1) {
        displayWeatherInfo(city);
        displayAdditionalWeatherInfo(city);
    }
})

function displayWeatherInfo(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

    // let queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    $.get(queryURL).then(function (response) {
        // let unIndex = response.coord.lon.lat;
        let lon = response.coord.lon;
        let lat = response.coord.lat;
        let queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.get(queryUV)
            .then(function (uvResponse) {
                // console.log(uvResponse)
                //===== Data Calculations =======
                let temperature = response.main.temp;
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;
                // ====== Building HTML Element =====
                let cityDiv = $("<div class='city'>");
                let header = $("<h4>").text(city);
                let pOne = $("<p>").text("Temperature: " + temperature + String.fromCharCode(176) + "F");
                let pTwo = $("<p>").text("Wind Speed: " + windSpeed + "mph");
                let pThree = $("<p>").text("Humidity: " + humidity + "%");

                let color = "green";
                let UVindex = uvResponse.value;
                if(UVindex > 10){
                    color = "red";
                }
                else if(UVindex > 4){
                    color = "orange";
                };


                let uvSpan = $("<span>").text(uvResponse.value).css("color", color)
                let pFour = $("<p>").text("UV Index: ").append(uvSpan);
                cityDiv.append(header, pOne, pTwo, pThree, pFour);
        
                // =======Push Element to Page =====
        
                $("#weather-view").empty();
                $("#weather-view").prepend(cityDiv);
            })


    })

}

function renderButtons(city) {
    let btn = $("<button>");
    btn.addClass("city-btn btn btn-default").css("display", "block");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // ====== Declare Variables ======
    let $weather = $("#city-input").val();

    // ===== Update Search History =====
    cities.push($weather);
    localStorage.setItem("weather", JSON.stringify(cities))

    // == Function calls ==
    renderButtons($weather);
    displayWeatherInfo($weather)
    displayAdditionalWeatherInfo($weather)

});

$(document).on("click", ".city-btn", function () {
    let city = $(this).attr("data-name");
    displayWeatherInfo(city);
    displayAdditionalWeatherInfo(city);
});

function displayAdditionalWeatherInfo(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;

    $.get(queryURL).then(function (response) {
        var responseArray = Array.from(response.list);
        var filterArray = responseArray.filter(function (el){
            return el.dt_txt.includes("12:00:00")
        });
        
        $.each(filterArray, function(index, value){
            var day = index + 1;

            var date = filterArray[index].dt_txt.split(" ")[0];
            var day_date = "#" + "day" + day + "-date";   
            $(day_date).text(date);

            var temp = filterArray[index].main.temp;
            var day_temp = "#" + "day" + day + "-temp";
            $(day_temp).text(temp);

            var humidity = filterArray[index].main.humidity;
            var day_humidity = "#" + "day" + day + "-humidity";
            $(day_humidity).text(humidity);
        })
    })

}