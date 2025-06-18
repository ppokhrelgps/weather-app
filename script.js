const apiKey = "81535069ec511cccf5d492ea0fdccbf6";
function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const { name, sys, main, weather, coord } = data;
      document.getElementById("weather-result").classList.remove("hidden");
      document.getElementById("location").textContent = `${name}, ${sys.country}`;
      document.getElementById("description").textContent = `Condition: ${weather[0].description}`;
      document.getElementById("temperature").textContent = `Temperature: ${main.temp} °C`;
      document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;

      const mapURL = `https://maps.google.com/maps?q=${coord.lat},${coord.lon}&z=10&output=embed`;
      document.getElementById("map-container").innerHTML = `<iframe width="100%" height="200" frameborder="0" style="border:0" src="${mapURL}" allowfullscreen></iframe>`;
    })
    .catch((err) => {
      alert("Error: " + err.message);
    });
}
