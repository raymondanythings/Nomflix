import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "react-query";
import styled from "styled-components";
import { detailApi, IMovie, ITvDetail } from "../api";
import { getGenres } from "../genres";
import { makeImagePath } from "../utils";

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

const BigContent = styled.div`
  padding: 20px;
  position: relative;
`;
const BigOverview = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const TvDetail: React.FC<{ id: number }> = ({ id }) => {
  const { isLoading, data } = useQuery<ITvDetail>(["detail", id], () =>
    detailApi.getTvDetail(id)
  );

  console.log(data);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <>
      {data && (
        <>
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top , black,transparent), url(${makeImagePath(
                data.backdrop_path,
                "w500"
              )})`,
            }}
          >
            <BigTitle>{data.name}</BigTitle>
          </BigCover>

          <BigContent>
            <BigOverview>{data.overview}</BigOverview>
            {data.origin_country &&
              data.origin_country.map((code) => (
                <ReactCountryFlag
                  key={code}
                  style={{ fontSize: "3rem" }}
                  countryCode={code}
                />
              ))}
            <div>
              <span>{data.adult ? 19 : "all"}</span>
              <span>{data.genres.map((m) => getGenres(m.id).name)}</span>
            </div>
          </BigContent>
        </>
      )}
    </>
  );
};

export default React.memo(TvDetail);
