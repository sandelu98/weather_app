const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '0383d40f5960ce70a68fff67f2fa7c8f';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

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

            weatherBox.style.display = 'flex';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '490px';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
        })
        .finally(() => {
            // Legg til denne delen for å fjerne skjulte klasser når du henter ny data
            weatherBox.classList.remove('hidden');
            weatherDetails.classList.remove('hidden');
        });
});

// Legg til denne hendelseslytteren for å håndtere animasjoner og layoutendringer
weatherBox.addEventListener('animationend', () => {
    // Legg til denne klassen for å skjule elementene etter at animasjonen er fullført
    weatherBox.classList.add('hidden');
    weatherDetails.classList.add('hidden');
});

// Legg til denne hendelseslytteren for å håndtere animasjoner og layoutendringer
weatherDetails.addEventListener('animationend', () => {
    // Legg til denne klassen for å skjule elementene etter at animasjonen er fullført
    weatherBox.classList.add('hidden');
    weatherDetails.classList.add('hidden');
});

