let result = [];
fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log(err));

function initialize(countryData) {
  countries = countryData;
  for (let i = 0; i < countries.length; i++) {
    result = countries.filter(function (e) {
      return e.currencies[0].code == "USD";
    });
  }
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].name);
  }
}
