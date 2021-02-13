class Movie {
  title: string;
  studio: string;
  rating: string;
  constructor(title: string, studio: string, rating: string = "PG13") {
    this.title = title;
    this.studio = studio;
    this.rating = rating;
  }
}
const GetPG = (movieData: Movie[]) => {
  return movieData.filter((x) => x.rating === "PG13");
};

let object = new Movie("Cassino Royale", "Eon Productions");

console.log(getPG(object));
