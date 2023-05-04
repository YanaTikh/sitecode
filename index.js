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
  function showInfo(response) {
    let temp = Math.round(response.data.main.temp);
    let grad = document.querySelector("#grad");
    grad.innerHTML = temp;
  }
  axios.get(apiUrl).then(showInfo);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

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
