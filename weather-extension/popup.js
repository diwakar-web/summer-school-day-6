const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f9a8ac482607d632c75f151424780f73";


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeartherData(city);
            displayWeatherInfo(weatherData);

        }
        catch (error) {
            console.log(error);
            displayError(error);
        }

    }
    else {
        displayError("Please Enter a City!")

    }


});

async function getWeartherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }

    return await response.json();

}


function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity:${humidity}`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = `${description}`;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    WeatherEmoji.textContent = getWeatherEmoji(id);
    WeatherEmoji.classList.add("weatherEmoji");
    card.appendChild(WeatherEmoji);
}


function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

            break;
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";

            break;

         case (weatherId >= 500 && weatherId < 500):
            return "🌧️";

            break;

         case (weatherId >= 600 && weatherId < 700):
            return "❄️";

            break;

         case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

            break;

         case (weatherId===800):
            return "☀️";

            break;

        case (weatherId>=801 && weatherId<810):
            return "⛅";

            break;
        default:
            return"🤷‍♂️"

    }
}


    function displayError(message) {
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        card.textContent = "";
        card.style.display = "flex";
        card.appendChild(errorDisplay)


    }