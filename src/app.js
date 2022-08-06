// Function to format date
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let day = days[date.getDay()];

  let hours = date.getHours();
  hours = ("0" + hours).slice(-2);

  let minutes = date.getMinutes();
  minutes = ("0" + minutes).slice(-2);

  return `${day} ${hours}:${minutes}`;
}

// Function to update weather
function updateWeather(response) {
  console.log(response.data);

  // Update city name
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  // Update description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  // Update temperature
  celsiusTemp = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  // Update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  // Update wind speed
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  // Update date and time
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  // Update weather icon and alt text
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

// Convert celsius temp to fahrenheit
function toFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
}

// Convert fahrenheit temp to celsius
function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLinkElement.classList.add("active");
  fahrenheitLinkElement.classList.remove("active");
}

// Axios call to Api
function search(city) {
  let apiKey = "22e2130aeacc47e61254fec6ce6af082";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

// Handle search engine submit
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(`${cityInputElement.value}`);
}

// Get city from user
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

// Global variable to store celsius temp
let celsiusTemp = null;

// Listen for clicks on temperature conversions
let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", toCelsius);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", toFahrenheit);

// Initial call to Paris to populate weather
search("Paris");
