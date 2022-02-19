import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "react-query";
import styled from "styled-components";
import { detailApi, IMovie, IMovieDetail } from "../api";
import { getGenres } from "../genres";
import { makeImagePath } from "../utils";

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;
  height: 400px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px;
  padding-right: 40px;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};

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

const MovieDetail: React.FC<{ id: number }> = ({ id }) => {
  const { isLoading, data } = useQuery<IMovieDetail>(["detail", id], () =>
    detailApi.getMovieDetail(id)
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
            <span
              style={{
                // position: "absolute",
                // bottom: "10px",
                // right: "10px",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              ⭐️{data.vote_average}/10
            </span>
            <BigTitle>{data.title}</BigTitle>
          </BigCover>
          <BigContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {data.production_companies.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 5px",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {m.logo_path && (
                    <img
                      src={makeImagePath(m.logo_path, "w500")}
                      style={{ width: "60%" }}
                      alt={m.name}
                    />
                  )}
                  <ReactCountryFlag countryCode={m.origin_country} />
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Production Contries</span>
              {data.production_countries.map((m) => (
                <div key={m.iso_3166_1}>
                  <ReactCountryFlag countryCode={m.iso_3166_1} />
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
            <BigOverview>{data.overview}</BigOverview>
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

export default React.memo(MovieDetail);
