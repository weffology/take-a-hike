$(document).ready(function () {

    //global variables
    var zipCode = 0;
    var difficultyLevel = "";
    var trailAPIKey = "200596650-c553e831ecdd1148b80c200473482707";
    var weatherAPIKey = "4f16b57711b05e07200b836df723d031";
    var cityName = "";
    var tempHigh = "";
    var tempLow = "";
    var clouds = "";
    var latitude = "";
    var longitude = "";
    var trailName = "";
    var trailSummary = "";
    var trailImage = "";
    var trailDistance = "";
    var trailStatus = "";
    var trailDetails = "";

    //create on click function for the submit button
    $("#submitBtn").on("click", function () {
        zipCode = $("#inputZip").val();
        difficultyLevel = $("#difficultyLevel").val();
        // IsValidZipCode();
        getWeather();
        getLongitude();
        console.log(zipCode);
        console.log(difficultyLevel);
    })

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
                returnTrails();
                returnWeather();

            })
    }

    function getLongitude() {
        var longitudeAPIKey = "Stukr8nGoCSSLDp6J5k8KmMKdI2DRgcHoYPU7UhSGMzaN6duoDJBXC96GT09AWFo";
        var queryURLLongitude = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + longitudeAPIKey + "/info.json/" + zipCode + "/degrees";
        $.ajax({
            url: queryURLLongitude,
            method: "GET"
        }).then(function (lResponse) {
            console.log('got zip')
            longitude = lResponse.lng;
            latitude = lResponse.lat;
            console.log("longitude: " + longitude);
            console.log("latitude: " + latitude);
            getTrails();
        })
    }

    function getTrails() {
        var queryURLTrail = "https://cors-anywhere.herokuapp.com/www.hikingproject.com/data/get-trails?lat= " + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + trailAPIKey;
        $.ajax({
            url: queryURLTrail,
            method: "GET",
        })
            .then(function (response) {
                console.log(response);
                for (var i = 0; i < response.trails.length; i++) {
                    trailName = response.trails[i].name;
                    trailSummary = response.trails[i].summary;
                    trailImage = response.trails[i].imgSmall;
                    trailDistance = response.trails[i].length;
                    trailStatus = response.trails[i].conditionStatus;
                    trailDetails = response.trails[i].conditionDetails;
                    console.log(trailName);
                    returnTrails();
                }

            })
    }

    //create a function to push values to the trails section
    function returnTrails() {

        //here's all the build out for the trails column
        var divTrails = $("<div>");
        divTrails.attr("class", "col-sm-8");
        divTrails.attr("id", "trailResults");
        divTrails.html("You've chosen a " + difficultyLevel + " trail.");
        divTrails.append("<p><img src=" + trailImage + "></p>");
        divTrails.append("<p>Trail Name: " + "<strong>" + trailName + "</strong>" + "</p>");
        divTrails.append("<p>Trail Summary: " + "<strong>" + trailSummary + "</strong>" + "</p>");
        divTrails.append("<p>Trail Distance: " + "<strong>" + trailDistance + "</strong>" + "</p>");
        divTrails.append("<p>Trail Status: " + "<strong>" + trailStatus + "</strong>" + "</p>");
        divTrails.append("<p>Trail Details: " + "<strong>" + trailDetails + "</strong>" + "</p>");
        //push all the above data into the row
        $("#row").html(divTrails);
    }

    //create a function to push values to the weather section
    function returnWeather() {

        //here's the build out for the weather column
        var divWeather = $("<div>");
        divWeather.attr("class", "col-sm-4");
        divWeather.attr("id", "weatherResults");
        divWeather.html("<p>Here is your current weather forcast for: " + "<strong>" + cityName + "</strong>" + "</p>");
        divWeather.append("<p>Your high temperature for today is: " + "<strong>" + tempHigh + "</strong>" + "</p>");
        divWeather.append("<p>Your low temperature for today is: " + "<strong>" + tempLow + "</strong>" + "</p>");
        //push all the above data into the row
        $("#row").append(divWeather);
    }

})

