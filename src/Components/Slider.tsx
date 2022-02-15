import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesTitle } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{ slideIndex: number }>`
  position: relative;
  margin: 20px 0px;
  &:hover {
    .arrow {
      opacity: 0.5;
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const ArrowBox = styled.div<{ pos: string }>`
  position: absolute;
  z-index: 1000;
  background-color: gray;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  ${(props) => (props.pos === "left" ? "left: 0;" : "right: 0;")}
`;

const TitleWrapper = styled.div`
  padding: 0px 30px;
  font-size: 1.4vw;
  line-height: 1.25vw;
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

const Slider: React.FC<{
  data: IGetMoviesTitle;
  index: number;
  title: string;
}> = ({ data, index: slideIndex, title }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [position, setPosition] = useState(true);

  const toggleLeaving = useCallback(() => setLeaving((prev) => !prev), []);
  const incraseIndex = useCallback(() => {
    if (data) {
      if (leaving) return;

      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  }, [data, leaving, toggleLeaving]);

  const decraseIndex = useCallback(() => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  }, [data, leaving, toggleLeaving]);

  const onBoxClicked = useCallback(
    (movieId: number, sliderTitle: string) => {
      navigate(`/${title}/${movieId}?title=${sliderTitle}`);
    },
    [navigate, title]
  );

  const rowVariants = {
    visible: {
      x: 0,
    },
    deHidden: {
      x: -window.outerWidth - 5,
    },
    deExit: {
      x: window.outerWidth + 5,
    },
    inHidden: {
      x: window.outerWidth + 5,
    },
    inExit: {
      x: -window.outerWidth - 5,
    },
  };
  return (
    <Wrapper slideIndex={slideIndex}>
      <TitleWrapper>
        <span>{data.title}</span>
      </TitleWrapper>
      <div style={{ position: "relative", height: "200px" }}>
        <ArrowBox
          className="arrow"
          onMouseEnter={() => setPosition(false)}
          onClick={() => {
            decraseIndex();
          }}
          pos="left"
        >
          &larr;
        </ArrowBox>
        <ArrowBox
          className="arrow"
          onMouseEnter={() => setPosition(true)}
          onClick={() => {
            incraseIndex();
          }}
          pos="right"
        >
          &rarr;
        </ArrowBox>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial={position ? "inHidden" : "deHidden"}
            animate="visible"
            exit={position ? "inExit" : "deExit"}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + data.title}
                  key={movie.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id, data.title)}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </div>
    </Wrapper>
  );
};

export default Slider;
