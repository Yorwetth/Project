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

    switch(weather.iconId){
        case "04n": //duże chmury
        case "04d": //duże chmury
        case "03d": //zachmurzenie
        case "03n": //zachmurzenie
            bgc.style.backgroundColor="rgba(2, 53, 91, 0.9)";
            break;

        case "02d": //lekkie chmury + słońce
            bgc.style.backgroundColor="#B1BCFE";
            break;
        case "02n": //lekkie chmury + księżyc
            bgc.style.backgroundColor="#90CCFE";
            break;

        case "50d": //mgła
            bgc.style.backgroundColor="#E2F8F8";
            break;
        case "13d": //śnieg
            bgc.style.backgroundColor="#E2F8F8";
            break;
        case "09d": // deszcz
            bgc.style.backgroundColor="#63C8FF";
            break;
        case "11d": // burza
            bgc.style.backgroundColor="#B2C5D0";
            break;
        case "10d": // lekki deszcz + słońce
            bgc.style.backgroundColor="#7CD1FF";
            break;

        case "01n": // noc
            bgc.style.backgroundColor="#C0C1C9";
            break;

        case "01d": //dzień
            bgc.style.backgroundColor="#FFC889";
            break;
    }


}   