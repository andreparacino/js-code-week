import {
  GENRES,
  IMAGE_PREFIX,
  genreSelect,
  topPicksData,
} from "./constants.js";
import {
  createElement,
  formatDescriptionText,
  getFormattedTitleHTML,
} from "./utilities.js";

export const generateRaterElement = ({ rating = 0, width = "100px" }) => {
  const raterDiv = document.createElement("div");
  raterDiv.style.width = width;
  raterDiv.classList.add("Rater");

  const fillAmountDiv = document.createElement("div");
  fillAmountDiv.classList.add("Rater-fillAmount");
  fillAmountDiv.style.width = rating * 10 + "%";

  const visualLayerImg = document.createElement("img");
  visualLayerImg.classList.add("Rater-visualLayer");
  visualLayerImg.src = "./assets/stars.png";
  // Ho creato in Canva un png apposito, gli altri metodi che ho visto online non
  // permettono di raggiungere chissà che precisione, in questo modo invece riesco a
  // visualizzare anche piccole porzioni di stella in base al floating number del rating

  raterDiv.appendChild(fillAmountDiv);
  raterDiv.appendChild(visualLayerImg);

  return raterDiv;
};

const generateGenreTags = ({ genreIds = [], compact }) => {
  const genreTagsContainer = createElement("div", { className: "GenreTags" });
  const ids =
    compact && genreIds.length > 2 ? genreIds.slice(0, 2) : [...genreIds];

  if (compact && genreIds.length > 2) ids.push(`+${genreIds.length - 2}`);

  ids.forEach((genreId) => {
    const genreLabel = GENRES[genreId] || genreId;
    const genreSpan = createElement("span", { textContent: genreLabel });
    genreTagsContainer.appendChild(genreSpan);
  });

  return genreTagsContainer;
};

export const generateHeroDots = (movies) => {
  const dotsContainer = document.querySelector(".Hero-footerIndicators");

  movies.forEach((_, index) => {
    const dot = createElement("div", {
      className: "Hero-footerIndicators-dot Hero-footerIndicators-dot--active",
    });
    dot.classList.toggle("Hero-footerIndicators-dot--active", index === 0);
    dotsContainer.appendChild(dot);
  });
};

export const updateHeroDots = () => {
  const dots = document.querySelectorAll(".Hero-footerIndicators-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle(
      "Hero-footerIndicators-dot--active",
      index === topPicksData.currentIndex
    );
  });
};

export const generateMovieInfo = ({ movie, target, closeTarget }) => {
  target.innerHTML = "";

  if (closeTarget) {
    const closeBtn = createElement("button", {
      className: "MovieInfo-closeBtn",
      innerHTML: "&times;",
    });
    closeBtn.addEventListener("click", () => {
      closeTarget.remove();
    });
    target.appendChild(closeBtn);
  }

  const image = createElement("img", {
    src: IMAGE_PREFIX + movie.poster_path,
    alt: "",
    width: "200",
    height: "300",
  });
  target.appendChild(image);

  const infoSection = createElement("article", {
    className: "MovieInfo-info",
  });
  target.appendChild(infoSection);

  const title = createElement("h2", {
    innerHTML: getFormattedTitleHTML(movie),
  });
  infoSection.appendChild(title);

  const ratingItem = createElement("div", {
    className: "MovieInfo-infoItem",
  });
  infoSection.appendChild(ratingItem);

  const ratingHeader = createElement("h3", {
    innerText: "Rating:",
  });
  const ratingContainer = createElement("div", {
    className: "MovieInfo-infoItem-ratingContainer",
  });
  const ratingElement = generateRaterElement({
    rating: movie.vote_average,
  });
  const ratingSpan = createElement("span", {
    innerText: `(${movie.vote_count})`,
  });
  ratingContainer.append(ratingElement, ratingSpan);
  ratingItem.append(ratingHeader, ratingContainer);

  const genresItem = createElement("div", {
    className: "MovieInfo-infoItem",
  });
  infoSection.appendChild(genresItem);

  const genresHeader = createElement("h3", {
    innerHTML: "Genres:",
  });
  const genresTags = generateGenreTags({ genreIds: movie.genre_ids });
  genresItem.append(genresHeader, genresTags);

  const overview = createElement("div", {
    className: "MovieInfo-infoItem",
  });
  infoSection.appendChild(overview);

  const overviewHeader = createElement("h3", {
    innerText: "Overview",
  });
  overview.appendChild(overviewHeader);

  const overviewParagraph = createElement("p", {
    innerText: movie.overview,
  });
  overview.appendChild(overviewParagraph);
};

const updateHeroBackground = (backgroundPath) =>
  document.documentElement.style.setProperty(
    "--heroBackgroundUrl",
    `url(${IMAGE_PREFIX}${backgroundPath})`
  );

export const refreshHero = () => {
  const isFirstRender = !document.querySelector(".Hero-footerIndicators-dot");
  const currentIndex = topPicksData.currentIndex;
  const movies = topPicksData.movies;

  updateHeroBackground(movies[currentIndex].backdrop_path);
  generateMovieInfo({
    movie: movies[currentIndex],
    target: document.querySelector(".MovieInfo"),
  });
  if (isFirstRender) generateHeroDots(movies);
  else updateHeroDots();
};

export const generateMovieCard = (movie) => {
  const movieCard = createElement("article", {
    className: "MovieCard",
    id: movie.id,
  });
  movieCard.append();
  const posterContainer = createElement("div", {
    className: "MovieCard-poster",
  });
  const posterLayers = [1, 2].map(() =>
    createElement("img", {
      src: IMAGE_PREFIX + movie.poster_path,
      alt: movie.title,
      width: 200,
      height: 300,
    })
  );
  posterContainer.append(...posterLayers);
  const title = createElement("h3", {
    innerHTML: getFormattedTitleHTML(movie),
  });
  const overview = createElement("p", {
    innerText: formatDescriptionText(movie.overview),
  });

  movieCard.append(
    posterContainer,
    title,
    generateRaterElement({ rating: movie.vote_average }),
    overview,
    generateGenreTags({ genreIds: movie.genre_ids, compact: true })
  );
  return movieCard;
};

export const populateMoviesList = ({ movies, targetArray, targetList }) => {
  targetArray.length = 0;
  targetArray.push(...movies);
  targetList.innerHTML = "";
  targetArray.forEach((movie) => {
    const movieCard = generateMovieCard(movie);
    targetList.appendChild(movieCard);
  });
};

export const generateMovieModal = (movie) => {
  const overlay = createElement("div", { className: "Overlay" });
  document.documentElement.style.setProperty(
    "--modalBackgroundUrl",
    `url(${IMAGE_PREFIX}${movie.backdrop_path})`
  );
  const modal = createElement("div", { className: "MovieModal MovieInfo" });
  generateMovieInfo({ movie, target: modal, closeTarget: overlay });

  overlay.append(modal);

  document.body.append(overlay);
};

export const adjustGenreSelectWidth = () => {
  const selectedOption = genreSelect.options[genreSelect.selectedIndex];
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = getComputedStyle(genreSelect).fontSize + " Roboto";
  const width = context.measureText(selectedOption.text).width;

  genreSelect.style.width = width + 20 + "px";
};
