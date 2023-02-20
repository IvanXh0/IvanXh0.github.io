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
const removeBtn = document.createElement("button");
removeBtn.setAttribute("id", "remove");
removeBtn.classList.add("fa-solid", "fa-rectangle-xmark");
removeBtn.classList.add("no-click");

searchField.appendChild(locationIcon);
searchField.appendChild(inputField);
searchField.appendChild(searchButton);
searchField.appendChild(removeBtn);

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
  const remove = container.querySelector("#remove");
  remove.addEventListener("click", removeContainer);
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
          // container.style.height = "400px";

          // container.querySelector(".weather-box").style.display = "none";
          // container.querySelector(".weather-details").style.display = "none";
          // container.querySelector(".not-found").style.display = "block";
          // container.querySelector(".not-found").classList.add("fadeIn");
          // return;
          container.querySelector("#textInput").classList.add("error");
          setTimeout(() => {
            container.querySelector("#textInput").classList.remove("error");
          }, 3000);
          return;
        }

        // container.querySelector(".not-found").style.display = "none";
        // container.querySelector(".not-found").classList.remove("fadeIn");

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
            container.style.background = "url('weather/clear.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          case "Rain":
            image.src = "weather/rain.png";
            container.style.background = "url('weather/giphy.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          case "Snow":
            image.src = "weather/snow.png";
            container.style.background = "url('weather/snow.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          case "Clouds":
            image.src = "weather/cloud.png";
            container.style.background = "url('weather/clouds.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          case "Haze":
            image.src = "weather/mist.png";
            container.style.background = "url('weather/haze.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          case "Mist":
            image.src = "weather/mist.png";
            container.style.background = "url('weather/mist.gif')";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundSize = "cover";
            break;

          default:
            image.src = "";
        }

        if (data.weather[0].main === "Mist") {
          const weatherDescription = container.querySelector(
            ".weatherbox .temperature p"
          );
          weatherDescription.style.color = "#fff";
        }

        if (data.weather[0].main === "Snow") {
          const humidityIcon = container.querySelector(".humidity i");
          const humidityLabel = container.querySelector(".humidity p");
          const humidityValue = container.querySelector(".humidity span");

          humidityIcon.style.color = "black";
          humidityLabel.style.color = "black";
          humidityValue.style.color = "black";

          const windLabel = container.querySelector(".weather-details .wind p");
          const windValue = container.querySelector(
            ".weather-details .wind span"
          );
          const windIcon = container.querySelector(".weather-details .wind i");
          windLabel.style.color = "black";
          windValue.style.color = "black";
          windIcon.style.color = "black";
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

  function removeContainer() {
    container.remove();
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
  cloneContainer = container.cloneNode(true);
  cloneContainer.querySelector("#remove").classList.remove("no-click");
  cloneContainer.querySelector("#textInput").classList.remove("error");
  cloneContainer.style.background = "#fff";
  cloneContainer.querySelector("input").value = "";
  cloneContainer.querySelector(".weather-box").classList.remove("fadeIn");
  cloneContainer.querySelector(".weather-details").classList.remove("fadeIn");
  cloneContainer.style.height = "120px";
  document.body.appendChild(cloneContainer);
  const btn = cloneContainer.querySelector("#searchBtn");
  btn.addEventListener("click", () => {
    resetClonedColors(cloneContainer);
    cloneContainer.querySelector(".weather-box").classList.add("fadeIn");
    cloneContainer.querySelector(".weather-details").classList.add("fadeIn");
  });
  initializeContainer(cloneContainer);
});

// removeBtn.addEventListener("click", () => {
//   const lastCloned = clonedArray.pop();
//   lastCloned.remove();
// });

function resetClonedColors(cloneContainer) {
  const clonedWeatherDetails = cloneContainer.querySelector(".weather-details");
  const clonedHumidityIcon = cloneContainer.querySelector(".humidity i");
  const clonedHumidityLabel = cloneContainer.querySelector(".humidity p");
  const clonedHumidityText = cloneContainer.querySelector(".humidity div");
  const clonedHumidityValue =
    cloneContainer.querySelector(".humidity div span");
  const clonedWindIcon = cloneContainer.querySelector(".wind i");
  const clonedWindLabel = cloneContainer.querySelector(".wind p");
  const clonedWindValue = cloneContainer.querySelector(".wind div span");

  clonedWeatherDetails.style.color = "#fff";
  clonedHumidityIcon.style.color = "#fff";
  clonedHumidityLabel.style.color = "#fff";
  clonedHumidityText.style.color = "#fff";
  clonedHumidityValue.style.color = "#fff";
  clonedWindIcon.style.color = "#fff";
  clonedWindLabel.style.color = "#fff";
  clonedWindValue.style.color = "#fff";
}
