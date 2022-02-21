import React from "react";
import styled from "styled-components";
import { ISpokenLanguages } from "../../api";
import { BoxContent, Col, LabelTitle, WhiteBox } from "../../lib/styled";
import { LangColors } from "../../lib/utils";

const Language = styled(WhiteBox)<{ index: number }>`
  background-color: ${(props) => LangColors[props.index]};
  color: white;
  font-weight: 500;
`;

const Languages: React.FC<{ data: ISpokenLanguages[] }> = ({ data }) => {
  return (
    <Col>
      <LabelTitle>Support Languages</LabelTitle>
      <BoxContent>
        {data.map((m, index) => (
          <Language key={m.english_name} index={index % LangColors.length}>
            {m.english_name}
          </Language>
        ))}
      </BoxContent>
    </Col>
  );
};

export default Languages;
