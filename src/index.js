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

let dayToday = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let detailsToday = document.querySelector(".today-day");

detailsToday.innerHTML = `${dayToday}, ${currentHour}:${currentMinutes}`;

let currentTemp = document.querySelector(".now-temp");
let celsius = document.querySelector(".c-temp");
let farenheit = document.querySelector(".f-temp");
let newCity = document.querySelector("#result-city");
let newHumidity = document.querySelector(".today-humidity");
let newWind = document.querySelector(".today-wind");
let apiKey = `1d9f5e22b7d5d2800eb8802fb2e8da88`;

function displayWeatherDetails(response) {
  let newTempDisplay = Math.round(response.data.main.temp);
  currentTemp.innerHTML = newTempDisplay;
  newHumidity.innerHTML = response.data.main.humidity;
  newWind.innerHTML = response.data.wind.speed;
  newCity.innerHTML = response.data.name;
  celsius.innerHTML = `<span class="selected-unit"> °C</span>`;
  farenheit.innerHTML = `<span class="f-temp">°F</span>`;
  farenheit.addEventListener("click", changeFaren);
  function changeFaren(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round((newTempDisplay * 9) / 5 + 32);
    event.target.innerHTML = `<span class="selected-unit"> °F</span>`;
    celsius.innerHTML = `<span class="f-temp">°C</span>`;
  }
  celsius.addEventListener("click", changeCelsius);
  function changeCelsius(event) {
    event.preventDefault();
    currentTemp.innerHTML = newTempDisplay;
    event.target.innerHTML = `<span class="selected-unit"> °C</span>`;
    farenheit.innerHTML = `<span class="f-temp">°F</span>`;
  }
}

function newCityDetails(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#chosen-city").value;
  newCityDetails(chosenCity);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

newCityDetails("Sydney");

function yourCityNow(Location) {
  let yourCurrentLocation = Location.data[0].name;
  newCityDetails(yourCurrentLocation);
}

function showYourLocation(location) {
  function getLocation(result) {
    let lat = result.coords.latitude;
    let long = result.coords.longitude;
    let yourCityUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

    axios.get(yourCityUrl).then(yourCityNow);
  }
  navigator.geolocation.getCurrentPosition(getLocation);
}
let yourLocation = document.querySelector(".your-location");
yourLocation.addEventListener("click", showYourLocation);