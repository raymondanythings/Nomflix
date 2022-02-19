import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "react-query";
import styled from "styled-components";
import { detailApi, IMovieDetail } from "../api";
import { getGenres } from "../genres";
import { makeImagePath } from "../utils";
import { GiEarthAmerica } from "react-icons/gi";

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

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigContent = styled.div`
  padding: 20px;
  position: relative;
`;
const BigOverview = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px 30px;
`;

const VoteAvg = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const LabelTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
`;

const TopContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Production = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 5px;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  padding: 5px 10px;
  color: black;
`;

const LinkIcon = styled(GiEarthAmerica)`
  margin-left: 10px;
  cursor: pointer;
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
`;

const Contry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const ContryName = styled.div`
  width: 4rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieDetail: React.FC<{ id: number }> = ({ id }) => {
  const { isLoading, data } = useQuery<IMovieDetail>(["detail", id], () =>
    detailApi.getMovieDetail(id)
  );

  const openBrowser = (url: string) => window.open(url);

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
            <TopContentWrapper>
              <VoteAvg>⭐️{data.vote_average}/10</VoteAvg>
              {data.homepage && (
                <LinkIcon onClick={() => openBrowser(data.homepage)} />
              )}
            </TopContentWrapper>
            <BigTitle>{data.title}</BigTitle>
          </BigCover>
          <BigContent>
            <Col>
              {data.production_companies.filter((m) => m.logo_path !== null)
                .length !== 0 && <LabelTitle>Providers</LabelTitle>}
              <BoxContent>
                {data.production_companies.map(
                  (m) =>
                    m.logo_path && (
                      <Production key={m.id}>
                        <img
                          src={makeImagePath(m.logo_path, "w500")}
                          style={{ width: "30%" }}
                          alt={m.name}
                        />
                      </Production>
                    )
                )}
              </BoxContent>
            </Col>
            {data.production_countries.length !== 0 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <LabelTitle>Production Contries</LabelTitle>
                <BoxContent>
                  {data.production_countries.map((m) => (
                    <Contry key={m.iso_3166_1}>
                      <ReactCountryFlag
                        style={{ fontSize: "4rem" }}
                        countryCode={m.iso_3166_1}
                      />
                      <ContryName>
                        <span>{m.name}</span>
                      </ContryName>
                    </Contry>
                  ))}
                </BoxContent>
              </div>
            )}
            {/* <span>{data.adult ? 19 : "All"}</span> */}
            {data.genres.length !== 0 && (
              <Col>
                <LabelTitle>Genres</LabelTitle>
                <BoxContent>
                  {data.genres.map((m) => (
                    <Production key={m.id}>{getGenres(m.id).name}</Production>
                  ))}
                </BoxContent>
              </Col>
            )}
            {data.spoken_languages.length !== 0 && (
              <Col>
                <LabelTitle>Support Languages</LabelTitle>
                <BoxContent>
                  {data.spoken_languages.map((m) => (
                    <Production key={m.iso_3166_1}>{m.english_name}</Production>
                  ))}
                </BoxContent>
              </Col>
            )}
            {data.overview && (
              <Col>
                <LabelTitle>Overview</LabelTitle>
                <BigOverview>{data.overview}</BigOverview>
              </Col>
            )}
          </BigContent>
        </>
      )}
    </>
  );
};

export default React.memo(MovieDetail);
