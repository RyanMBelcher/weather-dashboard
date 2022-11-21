let APIKey = 'e919e1cf7f216e7a1fc09c0a20305ee4';
let city;

let searchButton = document.getElementById('search-btn');
let weatherList = document.getElementById('weather-list');
let forecastSection = document.getElementById('forecast-section');
let currentCity = document.getElementById('current-city');
let fiveDayList = document.getElementById('five-day-list');

function fetchData() {

    function searchCity() {
        city = document.getElementById('city-search').value;

    }

    searchCity()

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
                weatherList.innerHTML = '';
                weatherList.appendChild(tempItem);
                weatherList.appendChild(humidityItem);
                weatherList.appendChild(windItem);
                currentCity.textContent = data.name;

            }); showDate();
    } currentForecast();

    function showDate() {
        let today = dayjs();
        // This displays the current date
        $('#current-day').text(today.format('(MMMM D, YYYY)'));

        let dayOne = dayjs().add(1, 'days')
        $('#day-one').text(dayOne.format('MM / D / YYYY'))
        let dayTwo = dayjs().add(2, 'days')
        $('#day-two').text(dayTwo.format('MM / D / YYYY'))
        let dayThree = dayjs().add(3, 'days')
        $('#day-three').text(dayThree.format('MM / D / YYYY'))
        let dayFour = dayjs().add(4, 'days')
        $('#day-four').text(dayFour.format('MM / D / YYYY'))
        let dayFive = dayjs().add(5, 'days')
        $('#day-five').text(dayFive.format('MM / D / YYYY'))

        console.log(dayOne)
        console.log(dayTwo)
        console.log(dayThree)
        console.log(dayFour)
        console.log(dayFive)
    }

    function fiveDayForecast() {

        let urlTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;

        fetch(urlTwo)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.list.length);
                // var weatherArr = data.list;
                let day = 1;
                for (let i = 0; i < data.list.length; i += 8) {
                    let tempItem = document.createElement('li');
                    let humidityItem = document.createElement('li');
                    let windItem = document.createElement('li');


                    tempItem.textContent = ('Temp: ') + data.list[i].main.temp + ('° F')
                    humidityItem.textContent = ('Humidity: ') + data.list[i].main.humidity + ('%');
                    windItem.textContent = ('Wind Speed: ') + data.list[i].wind.speed + (' MPH');

                    const currentListItem = document.getElementById(`five-day-list-${day}`)
                    console.log(currentListItem);
                    console.log(day);

                    currentListItem.appendChild(tempItem);
                    currentListItem.appendChild(humidityItem);
                    currentListItem.appendChild(windItem);
                    day += 1;

                }
                // weatherArr.forEach((element, b) => {

                //     // console.log(index)


                // })
                // var i = 0;
                // while (i < weatherArr) {
                //     console.log(i);

                //     tempItem.textContent = ('Temp: ') + data.list[i].main.temp + ('° F')
                //     humidityItem.textContent = ('Humidity: ') + data.list[i].main.humidity + ('%');
                //     windItem.textContent = ('Wind Speed: ') + data.list[i].wind.speed + (' MPH');

                //     fiveDayList.appendChild(tempItem);
                //     fiveDayList.appendChild(humidityItem);
                //     fiveDayList.appendChild(windItem);
                //     i += 8
                // }
                // }
                // )

            });
    }

    fiveDayForecast();


    function getGeoCode(city, APIKey) {
        let geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    }
}
searchButton.addEventListener('click', fetchData)