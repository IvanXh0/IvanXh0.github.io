const container = document.querySelector(".container");

// Create search field elements
const searchField = document.createElement("div");
searchField.classList.add("search-field");

const locationIcon = document.createElement("i");
locationIcon.classList.add("fa-solid", "fa-location-dot");

const inputField = document.createElement("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("id", "textInput");
inputField.setAttribute("placeholder", "Enter your location");

const searchButton = document.createElement("button");
searchButton.setAttribute("id", "searchBtn");
searchButton.classList.add("fas", "fa-search");

searchField.appendChild(locationIcon);
searchField.appendChild(inputField);
searchField.appendChild(searchButton);

// Create not found elements
const notFound = document.createElement("div");
notFound.classList.add("not-found");

const notFoundImage = document.createElement("img");
notFoundImage.setAttribute("src", "weather/404.png");

const notFoundText = document.createElement("p");
notFoundText.textContent = "Oopsie, invalid location!";

notFound.appendChild(notFoundImage);
notFound.appendChild(notFoundText);

// Create weather box elements
const weatherBox = document.createElement("div");
weatherBox.classList.add("weather-box");

const weatherImage = document.createElement("img");
weatherImage.setAttribute("alt", "");

const temperature = document.createElement("p");
temperature.classList.add("temperature");

const temperatureSpan = document.createElement("span");
temperatureSpan.textContent = "°C";

temperature.appendChild(temperatureSpan);

const description = document.createElement("p");
description.classList.add("description");

weatherBox.appendChild(weatherImage);
weatherBox.appendChild(temperature);
weatherBox.appendChild(description);

// Create weather details elements
const weatherDetails = document.createElement("div");
weatherDetails.classList.add("weather-details");

const humidity = document.createElement("div");
humidity.classList.add("humidity");

const humidityIcon = document.createElement("i");
humidityIcon.classList.add("fa-solid", "fa-water");

const humidityText = document.createElement("div");
const humidityValue = document.createElement("span");
humidityValue.textContent = "";
const humidityLabel = document.createElement("p");
humidityLabel.textContent = "Humidity";
humidityText.appendChild(humidityValue);
humidityText.appendChild(humidityLabel);

humidity.appendChild(humidityIcon);
humidity.appendChild(humidityText);

const wind = document.createElement("div");
wind.classList.add("wind");

const windIcon = document.createElement("i");
windIcon.classList.add("fa-solid", "fa-wind");

const windText = document.createElement("div");
const windValue = document.createElement("span");
windValue.textContent = "";
const windLabel = document.createElement("p");
windLabel.textContent = "Wind Speed";
windText.appendChild(windValue);
windText.appendChild(windLabel);

wind.appendChild(windIcon);
wind.appendChild(windText);

weatherDetails.appendChild(humidity);
weatherDetails.appendChild(wind);

// Append all elements to the container
container.appendChild(searchField);
container.appendChild(notFound);
container.appendChild(weatherBox);
container.appendChild(weatherDetails);

// Define function to initialize a new container
function initializeContainer(container) {
  const search = container.querySelector("#searchBtn");
  search.addEventListener("click", updateWeatherData);

  function updateWeatherData() {
    const APIKey = "387fa6995e2020b16cccd10c56bbe4aa";
    const city = container.querySelector(".search-field input").value;

    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherDetails.style.display = "none";
          notFound.style.display = "block";
          notFound.classList.add("fadeIn");
          return;
        }
        notFound.style.display = "none";
        notFound.classList.remove("fadeIn");

        const image = container.querySelector(".weather-box img");
        const temperature = container.querySelector(
          ".weather-box .temperature"
        );
        const description = container.querySelector(
          ".weather-box .description"
        );
        const humidity = container.querySelector(
          ".weather-details .humidity span"
        );
        const wind = container.querySelector(".weather-details .wind span");

        switch (data.weather[0].main) {
          case "Clear":
            image.src = "weather/clear.png";
            break;

          case "Rain":
            image.src = "weather/rain.png";
            break;

          case "Snow":
            image.src = "weather/snow.png";
            break;

          case "Clouds":
            image.src = "weather/cloud.png";
            break;

          case "Haze":
            image.src = "weather/mist.png";
            break;

          case "Mist":
            image.src = "weather/mist.png";
            break;

          default:
            image.src = "";
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
      });
  }
}

// Initialize the first container

initializeContainer(container);

// Add new containers on button click
const addSearchButtonDiv = document.createElement("div");
addSearchButtonDiv.classList.add("addSearchButtonDiv");
const addSearchButton = document.createElement("button");
addSearchButton.textContent = "Add More!";
addSearchButton.setAttribute("id", "addSearchButton");
addSearchButtonDiv.appendChild(addSearchButton);
document.body.appendChild(addSearchButtonDiv);

//Clone container creating, styling and functionality

addSearchButton.addEventListener("click", () => {
  const cloneContainer = container.cloneNode(true);
  cloneContainer.querySelector("input").value = "";
  cloneContainer.querySelector(".weather-box").classList.remove("fadeIn");
  cloneContainer.querySelector(".weather-details").classList.remove("fadeIn");
  cloneContainer.style.height = "120px";
  document.body.appendChild(cloneContainer);
  const btn = cloneContainer.querySelector("#searchBtn");
  btn.addEventListener("click", () => {
    cloneContainer.querySelector(".weather-box").classList.add("fadeIn");
    cloneContainer.querySelector(".weather-details").classList.add("fadeIn");
  });
  initializeContainer(cloneContainer);
});
