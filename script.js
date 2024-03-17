const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'cce963418420c00ec8f35d4311162bce';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const json = JSON.parse(xhr.responseText);
            console.log('Parsed JSON Data:', json);
            if (json.cod === '404') {
                throw new Error('City not found');
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const rain = document.querySelector('.weather-details .rain span');

            if (image && temperature && description && humidity && wind && rain) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.jpg';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.jpg';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.jpg';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.jpg';
                        break;
                    default:
                        image.src = 'images/cloud.jpg';
                        break;
                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
                if (json.rain && json.rain['1h']) {
                    rain.innerHTML = `${json.rain['1h']}mm`;
                } else {
                    rain.innerHTML = '0mm';
                }
            }
        } else {
            throw new Error('City not found');
        }
    };

    xhr.onerror = function() {
        console.error('Error:', xhr.statusText);
        container.style.height = '555px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
    };

    xhr.send();
});
