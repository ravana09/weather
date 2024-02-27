const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const weatherForm = document.getElementById("weatherForm");
const getLatLonBtn = document.getElementById("getLatLonBtn");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherCondition = document.querySelector(".weatherCondition");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const weatherIcon = document.querySelector(".weather-icon i");
const place =document.querySelector(".place");


// Event listener for the "Get Lat and Lon" button
getLatLonBtn.addEventListener("click", function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
});

// Callback function to display latitude and longitude
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // Update latitude and longitude input fields
  document.getElementById("latitudeInput").value = latitude;
  document.getElementById("longitudeInput").value = longitude;
}

// Event listener for form submission to fetch weather data
weatherForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const latitude = document.getElementById("latitudeInput").value.trim();
  const longitude = document.getElementById("longitudeInput").value.trim();
  
  if (latitude && longitude) {
    getWeather(latitude, longitude);
  } else {
    console.error("Please enter both latitude and longitude.");
  }
});

// Function to fetch weather data
function getWeather(latitude, longitude) {
  const apiKey = "95562096dd46f01523970abff224e39e"; // Replace 'YOUR_API_KEY' with your actual API key
  const apiUrl = `${weatherApi}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then(data => {
      // Update weather information on the webpage
      place.textContent = "Place: " + data.name + ", " + data.sys.country;
      weatherCondition.textContent = "Weather: " + data.weather[0].description;
      temperature.textContent = "Temperature: " + data.main.temp + "°C";
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      pressure.textContent = "Pressure: " + data.main.pressure + " hPa";

      // Update weather icon
      const weatherDescription = data.weather[0].description;
      let iconClass = "wi wi-day-cloudy";
      if (weatherDescription.includes("rain") || weatherDescription.includes("fog")) {
        iconClass = "wi wi-day-" + weatherDescription;
      }
      weatherIcon.className = iconClass;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    });
};

// Event listener for form submission to fetch weather data
weatherForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const latitude = document.getElementById("latitudeInput").value.trim();
  const longitude = document.getElementById("longitudeInput").value.trim();
  
  if (latitude && longitude) {
    getWeather(latitude, longitude);
    
    // Change the styling of the element with the .widgets class
    const widgetsElement = document.querySelector(".widgets");
    if (widgetsElement) {
      widgetsElement.classList.add("expanded");
    }
  } else {
    console.error("Please enter both latitude and longitude.");
  }
})




