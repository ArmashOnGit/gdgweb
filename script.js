// ===============================
// 1. API KEY
// ===============================
const API_KEY = "9eef7293d6ae1043c865fddc9c73c303";

// ===============================
// 2. Get all the elements from HTML
// ===============================
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorBox = document.getElementById("errorBox");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const feelsLike = document.getElementById("feelsLike");
const hum = document.getElementById("hum");
const wind = document.getElementById("wind");
const minmax = document.getElementById("minmax");
const pressure = document.getElementById("pressure");

// ===============================
// 3. Get selected units (°C / °F)
// ===============================
function getUnits() {
  return document.querySelector('input[name="units"]:checked').value;
}

// ===============================
// 4. Fetch weather from API
// ===============================
async function fetchWeather(city) {
  errorBox.textContent = "";
  weatherInfo.style.display = "none";

  try {
    const units = getUnits();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Looks like you entered a city that does not exist.");
    }

    const data = await response.json();
    showWeather(data, units);

  } catch (err) {
    errorBox.textContent = err.message;
  }
}

// ===============================
// 5. Show weather info
// ===============================
function showWeather(data, units) {
  const unitSymbol = units === "metric" ? "°C" : "°F";

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `Temperature: ${Math.round(data.main.temp)}${unitSymbol}`;
  feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}${unitSymbol}`;
  hum.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed} ${units === "metric" ? "m/s" : "mph"}`;
  minmax.textContent = `Min/Max: ${Math.round(data.main.temp_min)}${unitSymbol} / ${Math.round(data.main.temp_max)}${unitSymbol}`;
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
  desc.textContent = `Condition: ${data.weather[0].description}`;

  weatherInfo.style.display = "block";
}

// ===============================
// 6. Event listeners
// ===============================
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    errorBox.textContent = "Please enter a city name";
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
