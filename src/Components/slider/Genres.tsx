import React from "react";
import { getGenres, IGenres } from "../../genres";
import { BoxContent, Col, LabelTitle, WhiteBox } from "../../lib/styled";
import { checkZeroLength } from "../../lib/utils";

const Genres: React.FC<{ data: IGenres[] }> = ({ data }) => {
  return checkZeroLength(data) ? (
    <Col>
      <LabelTitle>Genres</LabelTitle>
      <BoxContent>
        {data.map((m) => (
          <WhiteBox
            style={{
              backgroundColor: getGenres(m.id).bgColor ?? "black",
              color: "white",
              fontWeight: 500,
            }}
            key={m.id}
          >
            {getGenres(m.id).name}
          </WhiteBox>
        ))}
      </BoxContent>
    </Col>
  ) : null;
};

export default Genres;
