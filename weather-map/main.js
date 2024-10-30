var input = document.getElementById("input");
var title = document.getElementById("titlee");
var wind = document.getElementById('wind');
var temp = document.getElementById("temp");
var image = document.getElementById("image");
var loader = document.getElementById("loaderr");


var images = [
    "images/vecteezy_3d-weather-icon-day-with-rain_24825182.png",  
    "images/vecteezy_3d-weather-icon-day-with-snow_24825197 (1).png", 
    "images/vecteezy_3d-weather-icon-day_24825180.png",  
    "images/vecteezy_3d-weather-icon_27245498.png"  
];

const API_key = 'a9fb97927b4242606199a031314ad009';

async function weather() {
    input.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            doSearch();
        }
    });

    async function doSearch() {
        const city_name = input.value.trim();
        if (city_name === "") {
            alert("enter city name before");
            return; 
        }

        try {
           
            title.textContent = "";
            temp.textContent = "";
            wind.textContent = "";
            image.src = "";
           
            loader.classList.remove("hidden");
            var one=performance.now();
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                title.textContent = city_name.toUpperCase();
                    temp.textContent = (data.main.temp - 273.15).toFixed(2) + " °C"; 
                    wind.textContent = data.wind.speed + " m/s";
                

        
                 setWeatherImage(data.weather[0].main);
                 
    function setWeatherImage(weatherCondition) {
        switch (weatherCondition) {
            case "Rain":
                image.src = images[0];
                break;
            case "Snow":
                image.src = images[1];
                break;
            case "Clear":
                image.src = images[3];
                break;
            case "Clouds":
                image.src = images[2];
                break;
            default:
                image.src = ""; 
        }
    }
                var two=performance.now();
                var time=two-one;

                setTimeout(() => {
                    loader.classList.add("hidden");
                    image.classList.remove("hidden");
                    temp.classList.remove("hidden");
                    wind.classList.remove("hidden");
                    title.classList.remove("hidden");
                },time);
            } else {
                loader.classList.add("hidden");
                alert("Data not found try again");
            }
        } catch (error) {
            alert("error " + error.message);
        }
    }

}

weather();
