import React from "react";
import { useQuery } from "react-query";
import { detailApi, ITvDetail } from "../api";
import { BigContent } from "../lib/styled";

import Cover from "./Cover";
import Loader from "./Loader";
import Creators from "./slider/Creators";
import Genres from "./slider/Genres";
import Languages from "./slider/Languages";
import Overview from "./slider/Overview";
import ProductionCountries from "./slider/ProductionCountries";
import Provider from "./slider/Provider";
import Seasons from "./slider/Seasons";

const TvDetail: React.FC<{ id: number }> = ({ id }) => {
  const { isLoading, data } = useQuery<ITvDetail>(["detail", id], () =>
    detailApi.getTvDetail(id)
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
            name={data.name}
            path={data.backdrop_path}
          />
          <BigContent>
            <Overview overview={data.overview} />
            <Provider data={data.networks} title="Networks" />
            <Creators data={data.created_by} />
            <ProductionCountries data={data.production_countries} />
            <Genres data={data.genres} />
            <Languages data={data.spoken_languages} />
            <Seasons data={data.seasons} />
          </BigContent>
        </>
      )}
    </>
  );
};

export default React.memo(TvDetail);
