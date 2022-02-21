import React from "react";
import { ISeasons } from "../../api";
import { BoxContent, Col, LabelTitle, WhiteBox } from "../../lib/styled";
import { checkZeroLength } from "../../lib/utils";
import LogoImg from "../LogoImg";

const Seasons: React.FC<{ data: ISeasons[] }> = ({ data }) => {
  return checkZeroLength(data) ? (
    <Col>
      <LabelTitle>Seasons</LabelTitle>
      <BoxContent seasons={data.length > 4}>
        {data.map((m) => (
          <WhiteBox key={m.id}>
            <Col>
              <LogoImg path={m.poster_path} size="w500" name={m.name} />
              <span>{m.name}</span>
              <span>{m.air_date}</span>
            </Col>
          </WhiteBox>
        ))}
      </BoxContent>
    </Col>
  ) : null;
};

export default Seasons;
