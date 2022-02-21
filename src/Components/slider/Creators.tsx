import React from "react";
import { ICreatedBy } from "../../api";
import { BoxContent, Col, LabelTitle, Production } from "../../lib/styled";
import { checkCreatorNullAndLength } from "../../lib/utils";
import LogoImg from "../LogoImg";

const Creators: React.FC<{ data: ICreatedBy[] }> = ({ data }) => {
  return checkCreatorNullAndLength(data) ? (
    <Col>
      <LabelTitle>Creators</LabelTitle>
      <BoxContent>
        {data.map(
          (m) =>
            m.profile_path && (
              <Production key={m.id} style={{ alignItems: "center" }}>
                <Col>
                  <LogoImg path={m.profile_path} size="w500" name={m.name} />
                  <span>{m.name}</span>
                </Col>
              </Production>
            )
        )}
      </BoxContent>
    </Col>
  ) : null;
};

export default Creators;
