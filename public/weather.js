const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temprature-value p");
const descElement = document.querySelector(".temprature-description p");
const locationElement = document.querySelector(".location-name p");
const notificationElement = document.querySelector(".notification");


var input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup",function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        city=input.value
        getSearchWeather(city)
        console.log(city)
    }
})
const button = document.querySelector(".btn.btn-primary");
button.addEventListener("click", () => {
            city=input.value
            getSearchWeather(city)
            console.log(city)
})

const weather = {}
const KELVIN = 273;
const key = '9dd851d3b3975123abb358fc2a6c5ccb'

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition,showError)
} else {
    notificationElement.innerHTML = '<p>Browser does not support geolocation </p>'
}

function setPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    getWeather(latitude,longitude)
}

locationIcon.addEventListener("click",function (event) {
    getWeather(latitude,longitude)
})

function showError(error) {
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

function getSearchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Extract weather data from the API response
            const temp = data.main.temp;
            const temprature = Math.floor(temp - KELVIN);
            console.log(temprature)
            const description = data.weather[0].description;
            const iconId = data.weather[0].icon;
            const city = data.name;
            const country = data.sys.country;

            // Update the weather object with the retrieved data
            weather.temprature = temprature;
            weather.description = description;
            weather.iconId = iconId;
            weather.city = city;
            weather.country = country;

            // Display the weather information on the UI
            displayWeather();
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            // Handle and display the error message
            notificationElement.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}


function getWeather(latitude, longitude) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Extract weather data from the API response
            const temp = data.main.temp;
            const temprature = Math.floor(temp - KELVIN);
            console.log(temprature)
            const description = data.weather[0].description;
            const iconId = data.weather[0].icon;
            const city = data.name;
            const country = data.sys.country;

            // Update the weather object with the retrieved data
            weather.temprature = temprature;
            weather.description = description;
            weather.iconId = iconId;
            weather.city = city;
            weather.country = country;

            // Display the weather information on the UI
            displayWeather();
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            // Handle and display the error message
            notificationElement.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}


function displayWeather(){
    notificationElement.innerHTML = "";
    iconElement.innerHTML=`<img src="images/weather/${ weather.iconId}.png" style="height: 175px;" width="175px">`
    tempElement.innerHTML = `${weather.temprature}°C`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}
