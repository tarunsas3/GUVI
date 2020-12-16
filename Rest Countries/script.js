let countries;

fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log(err));

function initialize(countryData) {
  countries = countryData;
  for (let i = 0; i < countries.length; i++) {
    console.log(countries[i].name);
  }
}
