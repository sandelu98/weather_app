/**
 * Weather App Documentation
 * -------------------------
 * This script fetches weather data from the OpenWeatherMap API based on user input.
 */

// DOM Element Selectors
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Event Listener for Search Button Click
search.addEventListener('click', () => {
    // OpenWeatherMap API Key
    const APIKey = '';

    // Get user input city name
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value;

    // Check if the input is empty
    if (city === '') {
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Handle 404 error
            if (json.cod === '404') {
                handleNotFoundError();
                return;
            }

            // Update weather information on success
            updateWeatherInfo(json);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            handleNotFoundError();
        })
        .finally(() => {
            // Remove hidden classes after data fetching is complete
            weatherBox.classList.remove('hidden');
            weatherDetails.classList.remove('hidden');
        });
});

// Handle Animation End for Weather Box
weatherBox.addEventListener('animationend', () => {
    hideWeatherElements();
});

// Handle Animation End for Weather Details
weatherDetails.addEventListener('animationend', () => {
    hideWeatherElements();
});

/**
 * Helper function to handle 404 errors and display appropriate message.
 */
function handleNotFoundError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

/**
 * Helper function to update weather information on the UI.
 * @param {Object} json - Weather data from OpenWeatherMap API.
 */
function updateWeatherInfo(json) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const luftfuktighet = document.querySelector('.weather-details .luftfuktighet span');
    const vindhastighet = document.querySelector('.weather-details .vindhastighet span');

    switch (json.weather[0].main.toLowerCase()) {
        case 'clear':
            image.src = 'img/sun.png';
            break;

        case 'rain':
            image.src = 'img/rain.png';
            break;

        case 'clouds':
            image.src = 'img/cloud.png';
            break;

        case 'snow':
            image.src = 'img/snow.png';
            break;

        default:
            image.src = '';
    }

    temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    luftfuktighet.innerHTML = `${json.main.humidity}%`;
    vindhastighet.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

    // Show weather elements with fadeIn animation
    weatherBox.style.display = 'flex';
    weatherDetails.style.display = 'flex';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '490px';
}

/**
 * Helper function to hide weather elements after animation ends.
 */
function hideWeatherElements() {
    weatherBox.classList.add('hidden');
    weatherDetails.classList.add('hidden');
}