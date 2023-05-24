let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = document.querySelector("#date");
today.innerHTML = day + " " + hours + ":" + minutes;

function showInfo(response) {
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(response.data.main.temp);
  let grad = document.querySelector("#grad");
  grad.innerHTML = temp;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "4e09c3t82fc9oa9cc0a13a8a5d636b2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img src="${forecastDay.condition.icon_url}" width="42"/>
      
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> ${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
      </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastDay.icon_url);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
  if (searchInput.value) {
    city.innerHTML = searchInput.value;
  } else {
    city.innerHTML = null;
    alert("Please, type a city");
  }
  let apiKey = "220f7884705091279476bbcd1679b0dc";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  apiUrl = apiUrl + searchInput.value + "&appid=" + apiKey + "&units=metric";

  axios.get(apiUrl).then(showInfo);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let celsiusTemp = null;

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "220f7884705091279476bbcd1679b0dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCity);
}

function showCity(response) {
  let curTemp = Math.round(response.data.main.temp);
  let curCity = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = curCity;
  let grad = document.querySelector("#grad");
  grad.innerHTML = curTemp;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);

let curCity = getCurrentPosition();
