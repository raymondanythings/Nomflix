import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { IGetMoviesTitle, tvApi } from "../api";
import Sliders from "../Components/Sliders";

import { makeImagePath } from "../utils";

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
  padding-bottom: 100px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
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
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Tv = () => {
  const { isLoading: nowLoading, data: nowData } = useQuery<IGetMoviesTitle>(
    ["tv", "latest"],
    tvApi.nowPlaying
  );
  const { isLoading: airingLoading, data: airingData } =
    useQuery<IGetMoviesTitle>(["tv", "airing"], tvApi.Airing);
  const { isLoading: popularLoading, data: popularData } =
    useQuery<IGetMoviesTitle>(["tv", "popular"], tvApi.popular);

  const { isLoading: topLoading, data: topData } = useQuery<IGetMoviesTitle>(
    ["tv", "topRated"],
    tvApi.topRated
  );

  const isLoading = nowLoading || airingLoading || popularLoading || topLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>
              {nowData?.results[0].title ?? nowData?.results[0].original_name}
            </Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>
          {nowData && airingData && popularData && topData && (
            <Sliders
              data={[nowData, airingData, popularData, topData]}
              title="tv"
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
