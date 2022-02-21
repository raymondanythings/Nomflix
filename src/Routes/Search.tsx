import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IGetMoviesTitle, searchApi } from "../api";
import Sliders from "../Components/Sliders";

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
  margin-top: 200px;
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get(
    "keyword"
  ) as unknown as string;
  const { isLoading, data } = useQuery<IGetMoviesTitle[]>(
    ["search", keyword],
    () => searchApi.getSearch(keyword)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>{data && <Sliders data={data} title="search" keyword={keyword} />}</>
      )}
    </Wrapper>
  );
};

export default Search;
