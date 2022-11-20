let APIKey = 'e919e1cf7f216e7a1fc09c0a20305ee4';
let city = 'philadelphia';

let searchButton = document.getElementById('search-btn');
let weatherList = document.getElementById('weather-list');
let forecastSection = document.getElementById('forecast-section');
let currentCity = document.getElementById('current-city');

function currentForecast() {

    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            let = tempItem = document.createElement('li');
            let = humidityItem = document.createElement('li');
            let = windItem = document.createElement('li');

            tempItem.textContent = ('Temp: ') + data.main.temp + ('° F')
            humidityItem.textContent = ('Humidity: ') + data.main.humidity + ('%');
            windItem.textContent = ('Wind Speed: ') + data.wind.speed + (' MPH');

            forecastSection.classList.remove('hidden');
            weatherList.appendChild(tempItem);
            weatherList.appendChild(humidityItem);
            weatherList.appendChild(windItem);
            currentCity.textContent = data.name;

        }); showDate();
}

searchButton.addEventListener('click', currentForecast);

function showDate() {
    let today = dayjs();
    // This displays the current date
    $('#current-day').text(today.format('(MMMM D, YYYY)'));

}
