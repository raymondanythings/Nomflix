import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesTitle } from "../api";
import MovieDetail from "./MovieDetail";
import Slider from "./Slider";
import TvDetail from "./TvDetail";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  max-width: 850px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sliders: React.FC<{
  data: IGetMoviesTitle[];
  title: string;
  keyword?: string;
}> = ({ data, title, keyword }) => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/${title}/:movieId`);
  const location = useLocation();
  const sliderTitle = new URLSearchParams(location.search).get("title");

  const { scrollY } = useViewportScroll();

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data
      .find((data) =>
        data?.results.find((movie) => {
          return movie.id + "" === bigMovieMatch.params.movieId;
        })
      )
      ?.results.find((movie) => movie.id + "" === bigMovieMatch.params.movieId);

  const onOverlayClicked = () => {
    navigate(-1);
  };

  return (
    <>
      {data &&
        data.map((movies, index) => (
          <Slider
            key={movies.title}
            keyword={keyword}
            index={index}
            data={movies}
            title={title}
          />
        ))}
      <AnimatePresence>
        {bigMovieMatch && sliderTitle ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              layoutId={bigMovieMatch.params.movieId + sliderTitle}
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedMovie &&
                (clickedMovie.title ? (
                  <MovieDetail id={clickedMovie.id} />
                ) : (
                  <TvDetail id={clickedMovie.id} />
                ))}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Sliders;
