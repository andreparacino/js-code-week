import { getMovies } from "./helpers/apis.js";
import {
  blockbusters,
  blockBustersList,
  heroNavigatorBtns,
  moviesByGenre,
  moviesByGenreList,
  SORT_CRITERIA,
  topPicksData,
} from "./helpers/constants.js";
import {
  refreshHero,
  adjustGenreSelectWidth,
  populateMoviesList,
} from "./helpers/domManipulators.js";
import {
  handleFetchError,
  handleGenreChange,
  handleHeroNavigation,
  handleMoviesListClick,
} from "./helpers/handlers.js";

// Inizializzazione stili dinamici
adjustGenreSelectWidth();

// Flusso di inizializzazione dei contenuti
getMovies()
  .then((movies) => {
    topPicksData.movies.push(...movies.slice(0, 10));
    refreshHero();
  })
  .catch((error) => handleFetchError({ error, scope: "top picks" }));

getMovies({ sortCriterion: SORT_CRITERIA.BLOCKBUSTERS })
  .then((movies) =>
    populateMoviesList({
      movies,
      targetArray: blockbusters,
      targetList: blockBustersList,
    })
  )
  .catch((error) => handleFetchError({ error, scope: "blockbusters" }));

getMovies({ genreId: genreSelect.value })
  .then((movies) =>
    populateMoviesList({
      movies,
      targetArray: moviesByGenre,
      targetList: moviesByGenreList,
    })
  )
  .catch((error) => handleFetchError({ error, scope: "movies by genre" }));

// Event listeners
heroNavigatorBtns.forEach((btn) =>
  btn.addEventListener("click", handleHeroNavigation)
);
[
  { element: blockBustersList, array: blockbusters },
  { element: moviesByGenreList, array: moviesByGenre },
].forEach((list) => {
  list.element.addEventListener("click", (event) =>
    handleMoviesListClick({ event, array: list.array })
  );
});
genreSelect.addEventListener("change", handleGenreChange);
