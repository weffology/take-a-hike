$(document).ready(function () {

    //global variables
    var zipCode = 0;
    var difficultyLevel = "";
    var trailAPIKey = "200596653-a7e0e793ed563b44b0305ea2b62726b3";
    var weatherAPIKey = "4f16b57711b05e07200b836df723d031";
    var cityName = "";
    var tempHigh = "";
    var tempLow = "";
    var latitude = "";
    var longitude = "";
    var trailName = "";
    var trailSummary = "";
    var trailImage = "";
    var trailDistance = "";
    var trailStatus = "";
    var trailDetails = "";

    // event listener that only allows numbers in the inpuZip box
    $("#inputZip").keyup(function (x) {
        if ($.isNumeric(x.key)) {
            // console.log("true");
            return (true);
        } else {
            $('#inputZip').val("");
            // console.log("false");
        }
    });

    //create on click function for the submit button
    $("#submitBtn").on("click", function () {
        zipCode = $("#inputZip").val();
        difficultyLevel = $("#difficultyLevel").val();
        
        //create loading gif and push onto page
        var loader = $("<div>");
        loader.attr("id", "loader");
        loader.html("<h3>We're fetching your trails now!</h3>")
        loader.append("<img src=https://media.giphy.com/media/9oIsM3g8xtdM56qq85/giphy.gif>");
        $("#doggies").html(loader);

        //call functions
        getWeather();
        getLongitude();
        console.log(zipCode);
        console.log(difficultyLevel);
    })
    $(document).ajaxStart(function () {
        // Show image container
        $("#row1").hide();
        $("#row2").hide();
        $("#loader").show();
        setTimeout(function () {
            $("#loader").hide();
            $("#row1").show();
            $("#row2").show();
        }, 3000);
    });

    function getWeather() {
        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=" + weatherAPIKey;
        $.ajax({
            url: queryURLWeather,
            method: "GET"
        })
            .then(function (response) {
                cityName = response.name;
                tempHigh = response.main.temp_max;
                tempLow = response.main.temp_min;
                clouds = response.clouds;
                returnWeather();

            })
    }

    function getLongitude() {
        var longitudeAPIKey = "3cCCT4w80fJ8ZxH84RMdGPts9bmeJ2UdRg4XUBobBphJeUJt36Yo1C70plajUUYp";
        var queryURLLongitude = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + longitudeAPIKey + "/info.json/" + zipCode + "/degrees";
        $.ajax({
            url: queryURLLongitude,
            method: "GET"
        }).then(function (lResponse) {
            longitude = lResponse.lng;
            latitude = lResponse.lat;
            getTrails();
        })
    }

    function getTrails() {
        var queryURLTrail = "https://cors-anywhere.herokuapp.com/www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + trailAPIKey;
        $.ajax({
            url: queryURLTrail,
            method: "GET",
        })
            .then(function (response) {
                console.log(response);
                console.log(response.trails.length);
                for (var i = 0; i < response.trails.length; i++) {
                    trailName = response.trails[i].name;
                    trailSummary = response.trails[i].summary;
                    trailImage = response.trails[i].imgSmall;
                    trailDistance = response.trails[i].length;
                    trailStatus = response.trails[i].conditionStatus;
                    if (trailStatus == "Unknown") {
                        trailStatus = "<span style='font-size: 30px'>&#129335;</span>"
                    }
                    if (trailImage === "") {
                        trailImage = "assets/images/leaf.png"
                    }
                    trailDetails = response.trails[i].conditionDetails;
                    if (trailDetails === null) {
                        trailDetails = "No information at this time. Hike at your own risk."
                    }
                    returnTrails();
                }

            })
    }

    //create a function to push values to the weather section
    function returnWeather() {
        var divWeather = $("<div>");
        divWeather.attr("class", "col-sm-12");
        divWeather.attr("id", "weatherResults");
        divWeather.html("<p>Here is your current weather forcast for: " + "<strong>" + cityName + "</strong>" + "</p>");
        divWeather.append("<p>Your high temperature for today is: " + "<strong>" + tempHigh + "</strong>" + "</p>");
        divWeather.append("<p>Your low temperature for today is: " + "<strong>" + tempLow + "</strong>" + "</p>");
        $("#row1").html(divWeather);
    }

    //create a function to push values to the trails section
    function returnTrails() {
        //create the div that all the results will live in
        var divTrails = $("<div>");
        divTrails.attr("class", "container");
        divTrails.attr("id", "trailResults");
        
        //create a row div and add it into the container
        var trailsRow = $("<div>");
        trailsRow.attr("class", "row");
        divTrails.append(trailsRow);
        
        //create a columns to display the trail image in a small column within the container
        var trailsImg = $("<div>");
        trailsImg.attr("class", "col-sm-3");
        trailsImg.append("<p><img src=" + trailImage + "></p>");
        trailsRow.append(trailsImg);

        //create another column to display the trail data in a larger column within the same container
        var trailsInfo = $("<div>");
        trailsInfo.attr("class", "col-sm-9");
        trailsInfo.append("<p>Trail Name: " + "<strong>" + trailName + "</strong>" + "</p>");
        trailsInfo.append("<p>Trail Summary: " + "<strong>" + trailSummary + "</strong>" + "</p>");
        trailsInfo.append("<p>Trail Length: " + "<strong>" + trailDistance + "</strong>" + "</p>");
        trailsInfo.append("<p>Trail Status: " + "<strong>" + trailStatus + "</strong>" + "</p>");
        trailsInfo.append("<p>Trail Details: " + "<strong>" + trailDetails + "</strong>" + "</p>");
        trailsRow.append(trailsInfo);

        //push all of the above into the row2 div
        $("#row2").append(divTrails);
    }

})

