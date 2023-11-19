const apiKey = "213dd4443eea0547b56b1362c6f2a324";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const yourLocationButton = document.getElementById("your-location-button");
const cityName = document.getElementById("city-name");
const currentTime = document.getElementById("current-time");
const displayDay = document.getElementById("current-day");
const displayDate = document.getElementById("current-date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("wind-speed");
const country = document.getElementById("country");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// Function to fetch weather data for a specific city
async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    if (data.cod === 200) {
      cityName.textContent = data.name;

      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.src = iconUrl;

      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      visibility.textContent = `Visibility: ${data.visibility} m`;
      pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      country.textContent = `, ${data.sys.country}`;
      sunrise.textContent = `Sunrise: ${new Date(
        data.sys.sunrise * 1000
      ).toLocaleTimeString()}`;
      sunset.textContent = `Sunset: ${new Date(
        data.sys.sunset * 1000
      ).toLocaleTimeString()}`;
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error(
      `Error fetching weather data for city "${city}":`,
      error.message
    );
    alert(`Error fetching weather data for city: ${city}`);
  }
}

// Handle search button click
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
    document.querySelector(".weather-details").style.display = "block";
    document.querySelector("#Starting-img").style.display = "none";
  } else {
    alert("Please enter a city name");
  }
});

// Handle "Your Location" button click
yourLocationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        alert("Error getting your location");
      }
    );
  } else {
    alert("Your browser does not support geolocation");
  }
});

// Update current time and date every second
setInterval(() => {
  const currentDate = new Date();
  currentTime.textContent = currentDate.toLocaleTimeString();
  displayDay.textContent = currentDate.toLocaleString("en-US", {
    weekday: "long",
  });
  displayDate.textContent = currentDate.toLocaleDateString();
}, 1000);
