import React from "react";
import { IProductionCompanies } from "../../api";
import { BoxContent, Col, LabelTitle, Production } from "../../lib/styled";
import { checkNullAndLength } from "../../lib/utils";
import LogoImg from "../LogoImg";

const Provider: React.FC<{
  data: IProductionCompanies[];
  title: string;
}> = ({ data, title }) => {
  return checkNullAndLength(data) ? (
    <Col>
      <LabelTitle>{title}</LabelTitle>
      <BoxContent>
        {data.map(
          (m) =>
            m.logo_path && (
              <Production key={m.id}>
                <div
                  style={{
                    boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <LogoImg
                    path={m.logo_path}
                    size="w500"
                    name={m.name}
                    title={title}
                  />
                </div>
              </Production>
            )
        )}
      </BoxContent>
    </Col>
  ) : null;
};

export default Provider;
