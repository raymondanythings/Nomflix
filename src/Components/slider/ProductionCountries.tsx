import React from "react";
import ReactCountryFlag from "react-country-flag";
import { IProductionCountries } from "../../api";
import {
  BoxContent,
  ContryName,
  LabelTitle,
  Production,
} from "../../lib/styled";
import { checkZeroLength } from "../../lib/utils";

const ProductionCountries: React.FC<{ data: IProductionCountries[] }> = ({
  data,
}) => {
  return checkZeroLength(data) ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LabelTitle>Production Contries</LabelTitle>
      <BoxContent>
        {data.map((m) => (
          <Production key={m.iso_3166_1}>
            <ReactCountryFlag
              style={{ fontSize: "4rem" }}
              countryCode={m.iso_3166_1}
            />
            <ContryName>
              <span>{m.name}</span>
            </ContryName>
          </Production>
        ))}
      </BoxContent>
    </div>
  ) : null;
};

export default ProductionCountries;
