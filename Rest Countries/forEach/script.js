fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log(err));

function initialize(countryData) {
  countries = countryData;
  countries.forEach((country) =>
    console.log(
      "Country Name : ",
      country.name,
      "\nCountry Capital : ",
      country.capital,
      "\nCountry Flag : ",
      country.flag
    )
  );
}
