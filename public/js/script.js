var weatherApi = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weather-icon i");
const weatherCondition = document.querySelector(".weatherCondition");
const temperature = document.querySelector(".temperature span");
const longitude  = document.querySelector(".longitude ");
const latitude  = document.querySelector(".latitude");


const locationElement = document.querySelector(".place");
const dataElee = document.querySelector(".date");

//time and date 
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Get the current time
const formattedTime = currentDate.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true, 
});

// Set the formatted date and time as the text content of the element
dataElee.textContent = `${formattedDate}, ${formattedTime}`;

//current location 

if ("geolocation" in navigator) {
  locationElement.textContent = "Loading.....";
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address && data.address.city) {
            const city = data.address.city;

            showData(city);
          } else {
            console.error("City not found in location data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    },
    function (error) {
      console.error("Error getting location:", error.message);
    }
  )
} else {
  console.error("Geolocation is not available in this browser.");
}



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationElement.textContent = "Loading....";
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";

  const city = search.value.trim(); // Trim any leading/trailing whitespace
  if (city) {
    showData(city); // Display weather information
    showLatLon(city); // Get latitude and longitude
  } else {
    console.error("Please enter a city name.");
  }
});


function showData(city){
  getWeatherData(city, (result) => {
    if (result.cod == 200) {
      if (
        result.weather[0].description == "rain" ||
        result.weather[0].description == "fog"
      ) {
        weatherIcon.className = "wi wi-day-" + result.description;
      } else {
        weatherIcon.className = "wi wi-day-cloudy";
      }
      locationElement.textContent = result?.name;
      temperature.textContent =
        ((result?.main?.temp - 273.15).toFixed(2)) + String.fromCharCode(176) + "C";
      weatherCondition.textContent =
        result?.weather[0]?.description?.toUpperCase();
      
      // Update longitude and latitude if available
      if (result.coord) {
        longitude.textContent = "Longitude: " + result.coord.lon.toFixed(2);
        latitude.textContent = "Latitude: " + result.coord.lat.toFixed(2);
      }

    } else {
      locationElement.textContent = "City not found";
      // Clear longitude and latitude if city not found
      longitude.textContent = "";
      latitude.textContent = "";
    }
  });
}



function getWeatherData(city, callback) {
  
 const locationApi = weatherApi + "?address=" + city;;

  fetch(locationApi)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      const { lat, lon } = data.coord;
      data.lat = lat;
      data.lon = lon;
      callback(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      callback({ cod: 404, message: "City not found" });
    });
}

document.getElementById("getLatLonBtn").addEventListener("click", function() {
  const city = document.querySelector(".search-button").value.trim(); // Trim any leading/trailing whitespace
  if (city) {
    showLatLon(city);
  } else {
    console.error("Please enter a city name.");
  }
});


