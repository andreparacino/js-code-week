import { getMovies } from "./apis.js";
import { moviesByGenre, moviesByGenreList, topPicksData } from "./constants.js";
import {
  adjustGenreSelectWidth,
  generateMovieModal,
  populateMoviesList,
  refreshHero,
} from "./domManipulators.js";

export const handleFetchError = ({ error, scope }) => {
  console.error(`Error retrieving ${scope}:`, error);
  document.body.innerHTML = "";
  alert("Something went wrong. Please try again later.");
};

export const handleHeroNavigation = (e) => {
  const { movies, currentIndex } = topPicksData;
  const value = +e.target.value;
  const moviesLength = movies.length;

  if (!currentIndex && value < 0) topPicksData.currentIndex = moviesLength - 1;
  else if (currentIndex === moviesLength - 1 && value > 0)
    topPicksData.currentIndex = 0;
  else topPicksData.currentIndex += value;

  refreshHero(topPicksData);
};

export const handleMoviesListClick = ({ event, array }) => {
  const movieCard = event.target.closest(".MovieCard");
  if (!movieCard) return;

  const movieId = +movieCard.id;
  const movieDetails = array.find((movie) => movie.id === movieId);
  if (!movieDetails) throw new Error("Movie details not found");

  generateMovieModal(movieDetails);
};

export const handleGenreChange = (event) => {
  adjustGenreSelectWidth(event);
  getMovies({ genreId: event.target.value })
    .then((movies) =>
      populateMoviesList({
        movies,
        targetArray: moviesByGenre,
        targetList: moviesByGenreList,
      })
    )
    .catch((error) => handleFetchError({ error, scope: "movies by genre" }));
};
