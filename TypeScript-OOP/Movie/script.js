var Movies = (function () {
  function Movies(title, studio, rating) {
    if (rating === void 0) {
      rating = "PG13";
    }
    this.title = title;
    this.studio = studio;
    this.rating = rating;
  }
  return Movies;
})();
var getPG = function (movieData) {
  return movieData.filter(function (x) {
    return x.rating === "PG13";
  });
};
var obj = new Movie("Cassino Royale", "Eon Productions");

console.log(getPG(obj));
