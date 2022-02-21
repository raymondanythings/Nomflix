import { IGenres } from "./genres";
const API_KEY = "8ebfd1b48062a2857432fcc8f95c3ce9";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
  title: string;
  original_name?: string;
  name?: string;
  genre_ids: number[];
  media_type?: string;
  origin_country?: string[];
}

export interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguages extends IProductionCountries {
  english_name: string;
}

export interface ICreatedBy {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

interface IEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITvDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: ICreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: IGenres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: IEpisodeToAir;
  name: string;
  next_episode_to_air: IEpisodeToAir;
  networks: IProductionCompanies[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  seasons: ISeasons[];
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
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

function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  )
    .then((res) => res.json())
    .then((res) => {
      return { title: "Now Playing", ...res };
    });
}

function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res) => {
      return { title: "Top Rated", ...res };
    });
}

function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res) => {
      return { title: "Upcoming", ...res };
    });
}

function getTvShows() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Latest Show", results };
    });
}

function getAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Airing Today", results };
    });
}

function getPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Popular", results };
    });
}

function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      const results = res.results.filter((data) => data.backdrop_path !== null);
      return { title: "Top Rated", results };
    });
}

function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
  )
    .then((res) => res.json())
    .then((res: IGetMoviesResponse) => {
      let movies: IMovie[] = [];
      let tv: IMovie[] = [];
      res.results.forEach((result) => {
        if (result.media_type === "movie" && result.backdrop_path !== null) {
          movies.push(result);
        } else if (
          result.media_type === "tv" &&
          result.backdrop_path !== null
        ) {
          tv.push(result);
        }
      });
      return [
        { title: `'${keyword}' on Movies`, results: movies },
        { title: `'${keyword}' on Tv Shows`, results: tv },
      ];
    });
}

export function getMovieDetail(id: number) {
  return fetch(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}
export function getTvDetail(id: number) {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko-KR`).then(
    (res) => res.json()
  );
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

export const searchApi = {
  getSearch: (keyword: string) => getSearch(keyword),
};

export const detailApi = {
  getMovieDetail: (id: number) => getMovieDetail(id),
  getTvDetail: (id: number) => getTvDetail(id),
};
