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
  function showCity(response) {
    let curTemp = Math.round(response.data.main.temp);
    let curCity = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = curCity;
    let grad = document.querySelector("#grad");
    grad.innerHTML = curTemp;
  }
  let apiKey = "220f7884705091279476bbcd1679b0dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);
function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#grad");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#grad");
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let fahrenheitLink = document.querySelector(".fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
let celsiusLink = document.querySelector(".celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemp);
