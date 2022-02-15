import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesTitle } from "../api";
import { makeImagePath } from "../utils";
import Slider from "./Slider";

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
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 48px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Sliders: React.FC<{ data: IGetMoviesTitle[]; title: string }> = ({
  data,
  title,
}) => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/${title}/:movieId`);
  const location = useLocation();
  const sliderTitle = new URLSearchParams(location.search).get("title");

  const { scrollY } = useViewportScroll();

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data
      .find((data) =>
        data?.results.find(
          (movie) => movie.id + "" === bigMovieMatch.params.movieId
        )
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
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top , black,transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Sliders;
