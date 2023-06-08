import { API_KEY, BASE_URL, AUTH_TOKEN, SORT_CRITERIA } from "./constants.js";

export const getMovies = async ({
  sortCriterion = SORT_CRITERIA.POPULAR,
  genreId,
} = {}) => {
  try {
    const queries = new URLSearchParams({
      api_key: API_KEY,
      sort_by: sortCriterion,
      ...(genreId && { with_genres: genreId }),
      include_adult: false,
    });

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    };

    const response = await fetch(
      `${BASE_URL}/discover/movie?${queries.toString()}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Error in getMovies: ${error.message}`);
  }
};
