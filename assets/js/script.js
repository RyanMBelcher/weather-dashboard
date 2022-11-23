let APIKey = 'e919e1cf7f216e7a1fc09c0a20305ee4';
let city;
let lat;
let lon;
let searchButton = document.getElementById('search-btn');
let weatherList = document.getElementById('weather-list');
let forecastSection = document.getElementById('forecast-section');
let currentCity = document.getElementById('current-city');
let fiveDayList = document.getElementById('five-day-list');
let fiveDaySection = document.getElementById('five-day-section');

searchButton.addEventListener('click', fetchOnSearch);
showCity();

function fetchOnSearch() {
    const callback = function () {
        currentForecast();
        fiveDayForecast();
        citySearch();
        showCity();
    }
    searchCity();
    getGeoCode(callback);
}

function fetchOnButtonClick(cityName) {
    const callback = function () {
        currentForecast();
        fiveDayForecast();
    };
    city = cityName;
    getGeoCode(callback);
}

function searchCity() {
    city = document.getElementById('city-search').value;
}

function getGeoCode(callbackFunction) {
    let geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            callbackFunction();
        })
}

function currentForecast() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let = tempItem = document.createElement('li');
            let = humidityItem = document.createElement('li');
            let = windItem = document.createElement('li');
            let = conditionsItem = document.createElement('li');

            tempItem.textContent = ('Temp: ') + data.main.temp + ('° F');
            humidityItem.textContent = ('Humidity: ') + data.main.humidity + ('%');
            windItem.textContent = ('Wind Speed: ') + data.wind.speed + (' MPH');
            conditionsItem.textContent = ('Conditions: ') + data.weather[0].description;

            forecastSection.classList.remove('hidden');
            fiveDaySection.classList.remove('hidden');
            weatherList.innerHTML = '';
            weatherList.appendChild(tempItem);
            weatherList.appendChild(humidityItem);
            weatherList.appendChild(windItem);
            weatherList.appendChild(conditionsItem);
            currentCity.textContent = data.name;

        }); showDate();
}

function showDate() {
    let today = dayjs();
    // This displays the current date
    $('#current-day').text(today.format('(MMMM D, YYYY)'));

    let dayOne = dayjs().add(1, 'days')
    $('#day-one').text(dayOne.format('MM/D/YYYY'))
    let dayTwo = dayjs().add(2, 'days')
    $('#day-two').text(dayTwo.format('MM/D/YYYY'))
    let dayThree = dayjs().add(3, 'days')
    $('#day-three').text(dayThree.format('MM/D/YYYY'))
    let dayFour = dayjs().add(4, 'days')
    $('#day-four').text(dayFour.format('MM/D/YYYY'))
    let dayFive = dayjs().add(5, 'days')
    $('#day-five').text(dayFive.format('MM/D/YYYY'))
}

function fiveDayForecast() {

    let urlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;


    fetch(urlTwo)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // var weatherArr = data.list;
            let day = 1;
            for (let i = 7; i < data.list.length; i += 8) {
                let tempItem = document.createElement('li');
                let humidityItem = document.createElement('li');
                let windItem = document.createElement('li');
                let conditionsItem = document.createElement('li');

                tempItem.textContent = ('Temp: ') + data.list[i].main.temp + ('° F')
                humidityItem.textContent = ('Humidity: ') + data.list[i].main.humidity + ('%');
                windItem.textContent = ('Wind Speed: ') + data.list[i].wind.speed + (' MPH');
                conditionsItem.textContent = ('Conditions: ') + data.list[i].weather[0].description;

                const currentListItem = document.getElementById(`five-day-list-${day}`)

                currentListItem.innerHTML = "";
                currentListItem.appendChild(tempItem);
                currentListItem.appendChild(humidityItem);
                currentListItem.appendChild(windItem);
                currentListItem.appendChild(conditionsItem);
                day += 1;

            }

        });
}

function citySearch() {
    let searchCity = document.getElementById('city-search').value;
    let searchHistory = JSON.parse(localStorage.getItem('city')) || [];
    if (!searchHistory.includes(searchCity)) {
        searchHistory.push(searchCity);
    }
    localStorage.setItem('city', JSON.stringify(searchHistory));
}

function showCity() {

    const searchHistory = JSON.parse(localStorage.getItem('city'));
    const cityList = document.getElementById('cities');
    cityList.innerHTML = '';
    for (let i = 0; i < searchHistory.length; i++) {
        const cityListItem = document.createElement('li');
        const cityButton = document.createElement('button');
        cityList.appendChild(cityListItem);
        cityListItem.appendChild(cityButton);
        const cityName = searchHistory[i];
        cityButton.textContent = cityName;
        cityButton.addEventListener('click', function () { fetchOnButtonClick(cityName) });
    }

}