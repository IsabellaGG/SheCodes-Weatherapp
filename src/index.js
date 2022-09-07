//⏰ Feature - Current time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${currentDay}, ${hours}:${minutes}`;
  return formattedDate;
}
let now = new Date();
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(now);

//🕵️‍♀️ Feature - Display City
//🌤 Feature - Show city temperature

function showTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "d07b5f60c5b1b4e1f6d89af42cf3edbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

//📍 Feature - Current location

function searchLocation(position) {
  let units = "metric";
  let apiKey = "d07b5f60c5b1b4e1f6d89af42cf3edbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-position-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
