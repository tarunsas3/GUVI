let result = [];
fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log(err));

function initialize(countryData) {
  countries = countryData;
  for (let i = 0; i < countries.length; i++) {
    result[i] = countries[i].population;
    answer = result.reduce(function (accumulator, current) {
      return accumulator + current;
    });
  }
  console.log("Total Population of Countries : ", answer);
}
