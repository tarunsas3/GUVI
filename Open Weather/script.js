fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log(err));

function initialize(countryData) {
  countries = countryData;
  console.log(countries[104].name);
  capital = countries[104].capital;
  position = countries[104].latlng;
  lat = position[0];
  long = position[1];
  console.log("By City Name");
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=9b7109bb1af3ddee64cd2b2174e8cad5`
  )
    .then((response) => response.json())
    .then((data) => process(data))
    .catch((error) => console.log(error));

  function process(weatherData) {
    weather = weatherData;
    console.log(weather);
  }
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9b7109bb1af3ddee64cd2b2174e8cad5`
  )
    .then((response) => response.json())
    .then((data) => processed(data))
    .catch((error) => console.log(error));

  function processed(weatherDataLocation) {
    weatherLocation = weatherDataLocation;
    console.log("By Latitude Longitude");
    console.log(weatherLocation);
  }
}
