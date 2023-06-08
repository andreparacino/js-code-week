import { getMovies } from "./apis.js";
import { IMAGE_PREFIX, topPicksData } from "./constants.js";
import {
  adjustGenreSelectWidth,
  generateMovieModal,
  populateMoviesList,
  refreshHero,
} from "./domManipulators.js";

export const getImage = (path) => IMAGE_PREFIX + path;

export const createElement = (tagName, attributes = {}) => {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  return element;
};

export const formatDescriptionText = (str) => {
  const words = str.split(" ");
  const truncatedText = words.splice(0, 6).join(" ");
  return `${truncatedText}...`;
};

export const getFormattedTitleHTML = (movie) => {
  const year = movie.release_date.split("-")[0];
  return `${movie.title} <span>(${year})</span>`;
};
