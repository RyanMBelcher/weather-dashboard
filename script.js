let APIKey = 'e919e1cf7f216e7a1fc09c0a20305ee4';
let city = 'philadelphia';

let searchButton = document.getElementById('search-btn');

function getAPI() {

    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;



    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < data.length; i++) {

            }
        });
}

searchButton.addEventListener('click', getAPI);            