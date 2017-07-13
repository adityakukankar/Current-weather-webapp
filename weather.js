$(document).ready(function () {



    $("#convertToCelsiusButton").hide();
    var currentWeather = '', faren, celc;
    function getLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var address;
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log("Latitude is ", lat, " Longitude is ", lon);
            loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        });
        function loadWeather(location, woeid) {
            //simple weather
            $.simpleWeather({
                location: location,
                woeid: woeid,
                unit: 'c',
                success: function (weather) {
                    $("h2").html( weather.title);
                    $("#temperature").html("Temperature:  " + weather.temp + "°C");
                    $("#location").html("Your location: " + weather.region + ', ' + weather.city);
                    $("#pressure").html("Pressure: " + weather.pressure + " atm");
                    $("#wind").html("Wind speed: " + weather.wind.speed + " km/h");
                    $("#general").html("Weather condition: " + weather.currently);
                    $("#visibility").html("Visibility: " + weather.visibility);
                    $("#humidity").html("Humidity: " + weather.humidity + " %");

                    currentWeather = weather.currently;
                    faren = weather.alt.temp;
                    celc = weather.temp;

                    //idea and weather keywords: 
                    var sunny = /(sun|clear|calm|hot)+/i;
                    var storm = /(storm|tornado|hurricane)+/i;
                    var cloudy = /(clouds|cloud|fog|dust|haze|smok|bluster)+/i;
                    var rainy = /(rain|drizzl|shower)+/i;
                    var snowy = /(snow|freez|hail|cold|sleet)+/i;

                    console.log(currentWeather);
                    if (cloudy.test(currentWeather)) { $("#cloudy").addClass("icon-background"); }
                    if (rainy.test(currentWeather)) { $("#rainy").addClass("icon-background"); }
                    if (sunny.test(currentWeather)) { $("#sunny").addClass("icon-background"); }
                    if (storm.test(currentWeather)) { $("#thunder-storm").addClass("icon-background"); }
                    if (snowy.test(currentWeather)) { $("#flurries").addClass("icon-background"); }
                    if ($("#sunny").hasClass("icon-background") && $("#rainy").hasClass("icon-background")) {
                        $("#sun-shower").addClass("icon-background");
                    }

                },
                error: function (error) {
                    $("#weather").html('<p>' + error + '</p>');
                }
            });

            $("#convertToCelsiusButton").click(function () {
                $("#temperature").html("Temperature:  " + faren + "°C");
                $("#convertToCelsiusButton").hide();
                $("#convertToFahrenheitButton").show();
            });

            $("#convertToFahrenheitButton").click(function () {

                $("#temperature").html("Temperature:  " + celc + "°F");
                $("#convertToCelsiusButton").show();
                $("#convertToFahrenheitButton").hide();
            });
        }
        
    }

    getLocation();

});
// openweatherapi 
        //     if (navigator.geolocation) {
        //         console.log("Navigator is supported in this browser!");
        //         navigator.geolocation.getCurrentPosition(function (position) {
        //             var address;
        //             var lat = position.coords.latitude;
        //             var lon = position.coords.longitude;
        //             console.log("Latitude is ", lat, " Longitude is ", lon);

        //             openWeatherUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=ab395f4ef9ca67740fc43a818901534f&units=metric';

        //             $.getJSON(openWeatherUrl, function (data) {
        //                 var latlng = new google.maps.LatLng(lat, lon);
        //                 // This is making the Geocode request
        //                 var geocoder = new google.maps.Geocoder();
        //                 geocoder.geocode({ 'latLng': latlng }, function (results, status) {

        //                     if (status !== google.maps.GeocoderStatus.OK) {

        //                         alert(status);
        //                     }
        //                     // This is checking to see if the Geoeode Status is OK before proceeding
        //                     if (status == google.maps.GeocoderStatus.OK) {

        //                         address = (results[0].formatted_address);
        //                         console.log(address);
        //                     }
        //                 });
        //                 var celsius = data.main.temp;
        //                 var location = data.name;
        //                 var pressure = data.main.pressure;
        //                 var clouds = data.clouds.all;
        //                 var windspeed = data.wind.speed;
        //                 var weatherCondition = data.weather[0].description;
        //                 var visibility = data.visibility;
        //                 var humidity = data.main.humidity;
        //                 var icon = data.weather[0].icon;

        //                 $("#temperature").html("Temperature:  " + celsius + "°C");
        //                 $("#location").html("Your location: " + address);
        //                 $("#pressure").html("Pressure: " + pressure + " atm");
        //                 $("#clouds").html("Clouds: " + clouds + "%");
        //                 $("#wind").html("Wind speed: " + windspeed + " km/h");
        //                 $("#general").html("General weather condition: " + weatherCondition);
        //                 $("#visibility").html("Visibility: " + visibility);
        //                 $("#humidity").html("Humidity: " + humidity + " %");

        //                 //idea and weather keywords: 
        //                 var sunny = /(sun|clear|calm|hot)+/i;
        //                 var storm = /(storm|tornado|hurricane)+/i;
        //                 var cloudy = /(clouds|cloud|fog|dust|haze|smok|bluster)+/i;
        //                 var rainy = /(rain|drizzl|shower)+/i;
        //                 var snowy = /(snow|freez|hail|cold|sleet)+/i;


        //                 var currentWeather = data.weather[0].main + " " + data.weather[0].description;
        //                 console.log(currentWeather);
        //                 if (cloudy.test(currentWeather)) { $("#cloudy").addClass("icon-background"); }
        //                 if (rainy.test(currentWeather)) { $("#rainy").addClass("icon-background"); }
        //                 if (sunny.test(currentWeather)) { $("#sunny").addClass("icon-background"); }
        //                 if (storm.test(currentWeather)) { $("#thunder-storm").addClass("icon-background"); }
        //                 if (snowy.test(currentWeather)) { $("#flurries").addClass("icon-background"); }
        //                 if ($("#sunny").hasClass("icon-background") && $("#rainy").hasClass("icon-background")) {
        //                     $("#sun-shower").addClass("icon-background");
        //                 }

        //                 $("#convertToCelsiusButton").click(function () {
        //                     $("#temperature").html("Temperature:  " + celsius + "°C");
        //                     $("#convertToCelsiusButton").hide();
        //                     $("#convertToFahrenheitButton").show();
        //                 });

        //                 $("#convertToFahrenheitButton").click(function () {
        //                     fahrenheit = Math.round((celsius * 9 / 5 + 32) * 100) / 100;
        //                     $("#temperature").html("Temperature:  " + fahrenheit + "°F");
        //                     $("#convertToCelsiusButton").show();
        //                     $("#convertToFahrenheitButton").hide();
        //                 });

        //             });

        //         },
        //             //It specifies a function to run if it fails to get the user's location
        //             function (error) {
        //                 $("#weather-container").html("'Error: The Geolocation service failed.'");

        //             }
        //         );
        //     } else {
        //         console.log("Navigator is not suppoerted in this browser!");
        //         $("#weather-container").html("Geolocation is not supported by this browser.");
        //     }
