import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesTitle } from "../api";
import { getGenres } from "../genres";
import ReactCountryFlag from "react-country-flag";
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
  overflow-y: scroll;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  display: flex;
  align-items: flex-end;
  padding-right: 40px;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 48px;
`;

const BigOverview = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const BigContent = styled.div`
  padding: 20px;
  position: relative;
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
          console.log(data);

          return movie.id + "" === bigMovieMatch.params.movieId;
        })
      )
      ?.results.find((movie) => movie.id + "" === bigMovieMatch.params.movieId);

  // const clickedMovie =
  //   bigMovieMatch && getDetail(bigMovieMatch?.params.movieId);

  console.log(clickedMovie);
  const onOverlayClicked = () => {
    navigate(-1);
  };
  const videoTitle = clickedMovie
    ? clickedMovie.title ?? clickedMovie.name
    : null;

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
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top , black,transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  >
                    <BigTitle>{videoTitle && videoTitle}</BigTitle>
                  </BigCover>

                  <BigContent>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                    {clickedMovie.origin_country &&
                      clickedMovie.origin_country.map((code) => (
                        <ReactCountryFlag
                          style={{ fontSize: "3rem" }}
                          countryCode={code}
                        />
                      ))}
                    <div>
                      <span>{clickedMovie.adult ? 19 : "all"}</span>
                      <span>
                        {clickedMovie.genre_ids.map((m) => getGenres(m).name)}
                      </span>
                    </div>
                  </BigContent>
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
