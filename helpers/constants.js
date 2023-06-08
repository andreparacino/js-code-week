// KEY & AUTH
export const API_KEY = "50b102ed679d0970758deb9e467e5368";
export const AUTH_TOKEN =
  "eyJhbGciOiJIUeyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGIxMDJlZDY3OWQwOTcwNzU4ZGViOWU0NjdlNTM2OCIsInN1YiI6IjY0N2RhNTQ3MGUyOWEyMmJkZWJjZTE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._R-EG5TvoXw7DHvIrJ51ubYSYEMSvBm7wC92DVLFzkwzI1NiJ9.eyJhdWQiOiIzOTk3ZDIyNGU1Mzk5ZDY0YWM4ODE3ZWNhYzUwZGUyYyIsInN1YiI6IjY0N2RhNTQ3MGUyOWEyMmJkZWJjZTE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5zCNviF5vkENh-6KDgrrWRu_q7PCZdy7R1Gjxwk7RE0";

// Valori statici relativi all'API
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_PREFIX = "https://image.tmdb.org/t/p/original";
export const SORT_CRITERIA = {
  POPULAR: "popularity.desc",
  TOP_RATED: "vote_average.desc",
  BLOCKBUSTERS: "revenue.desc",
  UPCOMING: "release_date.desc",
};
export const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Liste dinamiche
export const topPicksData = {
  movies: [],
  currentIndex: 0,
};
export const blockbusters = [];
export const moviesByGenre = [];

// Elementi HTML statici
export const heroNavigatorBtns =
  document.querySelectorAll(".Hero-navigatorBtn");
export const blockBustersList = document.querySelector(".Blockbusters-list");
export const moviesByGenreList = document.querySelector(".MoviesByGenre-list");
export const genreSelect = document.getElementById("genreSelect");
