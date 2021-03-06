import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { IGetMoviesTitle, movieApi } from "../api";
import Loader from "../Components/Loader";
import Sliders from "../Components/Sliders";

import { makeImagePath } from "../lib/utils";

const fadeIn = keyframes`
0%{
  opacity:  0 ;
}
100% {
  opacity:  1;
}
`;

const Wrapper = styled.div`
  background: black;
  padding-bottom: 60px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  white-space: nowrap;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 500px;
`;

const Home = () => {
  const { isLoading: nowLoading, data: nowData } = useQuery<IGetMoviesTitle>(
    ["movies", "nowPlaying"],
    movieApi.nowPlaying
  );
  const { isLoading: topLoading, data: topData } = useQuery<IGetMoviesTitle>(
    ["movies", "topRated"],
    movieApi.topRated
  );
  const { isLoading: upLoading, data: upData } = useQuery<IGetMoviesTitle>(
    ["movies", "upcoming"],
    movieApi.upcoming
  );

  const isLoading = nowLoading || topLoading || upLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader main={true} />
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>
              {nowData?.results[0].overview
                ? nowData?.results[0].overview.length >= 120
                  ? nowData?.results[0].overview.slice(0, 120) + " ..."
                  : nowData?.results[0].overview
                : null}
            </Overview>
          </Banner>
          {nowData && topData && upData && (
            <Sliders data={[nowData, topData, upData]} title="movies" />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Home;
