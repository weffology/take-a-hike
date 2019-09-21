$(document).ready(function() {

    //global variables
   var zipCode = 0;
   var difficultyLevel = "";
   var queryURLTrail = "";
   var weatherAPIKey = "4f16b57711b05e07200b836df723d031";
   var cityName = "";
   var tempHigh = "";
   var tempLow = "";
   var clouds = "";
   var precip = "";

    //create on click function for the submit button
   $("#submitBtn").on("click", function () {
    zipCode = $("#inputZip").val();
    difficultyLevel = $("#difficultyLevel").val();
    // IsValidZipCode();
    getWeather();
    console.log(zipCode);
    console.log(difficultyLevel);
})
//create a zipcode validation function
// function IsValidZipCode(zipCode) {
//     var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);
//     if (!isValid) {
//         alert("This is not Valid");
//         return false;
//     }
//     else {
//         console.log("Zip Code is valid")
//     }
// }
function getWeather() {
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=" + weatherAPIKey;
    $.ajax({
        url: queryURLWeather,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            cityName = response.name;
            tempHigh = response.main.temp_max;
            tempLow = response.main.temp_min;
            clouds = response.clouds;
            console.log(cityName);
            console.log(tempHigh);
            console.log(tempLow);
            console.log(clouds);
            returnResults();

        })
}

    
    //create a function to push values
    function returnResults() {
        var divTrails = $("<div>");
            divTrails.attr("class", "col-sm-8");
            divTrails.attr("id", "trailResults");
            divTrails.html("You've chosen a " + difficultyLevel + " trail.");
        var divWeather = $("<div>");
            divWeather.attr("class", "col-sm-4");
            divWeather.attr("id", "weatherResults");
            divWeather.html("Here is your current weather forcast for: " + cityName);
            divWeather.append("Your high temperature is: " + tempHigh);
        $("#row").html(divTrails);
        $("#row").append(divWeather);
    }
})

