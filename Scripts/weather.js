// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const bgc = document.querySelector(".weather");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "940ae9987755baf3054db4ed93d7c75c";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Przeglądarka nie wspiera geolokalizacji</p>";
}
// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Włącz geolokalizację</p>`;
    tempElement.innerHTML="";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}
// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.svg"/>`;
    tempElement.innerHTML = `<span class="material-symbols-outlined">
    device_thermostat
</span>${weather.temperature.value}°<span>C</span>`;
    locationElement.innerHTML = `<span class="material-symbols-outlined">
    near_me
    </span>${weather.city}, ${weather.country}`;
    bgc.style.backgroundColor="rgba(2, 53, 91, 0.9)";
}   