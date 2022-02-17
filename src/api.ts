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
        { title: "Search Movies", results: movies },
        { title: "Search Tv Shows", results: tv },
      ];
    });
}

// export async function getDetail(id: string | undefined) {
//   if (id) {
//     await fetch()
//   }
// }

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
