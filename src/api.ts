const API_KEY = "8ebfd1b48062a2857432fcc8f95c3ce9";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
  original_name?: string;
}

export interface IGetMoviesResponse {
  dates?: {
    maximum: string;
    minimum: string;
  };
  results: IMovie[];
  // page: number;
  // total_pages: number;
  // total_results: number;
}

export interface IGetMoviesTitle extends IGetMoviesResponse {
  title: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      return { title: "Now Playing", ...res };
    });
}

export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      return { title: "Top Rated", ...res };
    });
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      return { title: "Upcoming", ...res };
    });
}

export function getTvShows() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Latest Show", results };
    });
}

export function getAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Airing Today", results };
    });
}

export function getPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Popular", results };
    });
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Top Rated", results };
    });
}

export const movieApi = {
  nowPlaying: () => getMovies(),
  topRated: () => getTopRatedMovies(),
  upcoming: () => getUpcomingMovies(),
};

export const tvApi = {
  nowPlaying: () => getTvShows(),
  Airing: () => getAiringToday(),
  popular: () => getPopular(),
  topRated: () => getTopRatedTv(),
};
