import React from "react";
import { useQuery } from "react-query";
import { detailApi, IMovieDetail } from "../api";
import { BigContent } from "../lib/styled";
import Provider from "./slider/Provider";
import ProductionCountries from "./slider/ProductionCountries";
import Genres from "./slider/Genres";
import Languages from "./slider/Languages";
import Loader from "./Loader";
import Cover from "./Cover";
import Overview from "./slider/Overview";

const MovieDetail: React.FC<{ id: number }> = ({ id }) => {
  const { isLoading, data } = useQuery<IMovieDetail>(["detail", id], () =>
    detailApi.getMovieDetail(id)
  );
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {data && (
        <>
          <Cover
            homepage={data.homepage}
            average={data.vote_average}
            name={data.title}
            path={data.backdrop_path}
          />
          <BigContent>
            <Overview overview={data.overview} />
            <Provider data={data.production_companies} title="Providers" />
            <ProductionCountries data={data.production_countries} />
            <Genres data={data.genres} />
            <Languages data={data.spoken_languages} />
          </BigContent>
        </>
      )}
    </>
  );
};

export default React.memo(MovieDetail);
