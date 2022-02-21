import React from "react";
import { BigOverview, Col, LabelTitle } from "../../lib/styled";

const Overview: React.FC<{ overview: string }> = ({ overview }) => {
  return overview ? (
    <Col>
      <LabelTitle>Overview</LabelTitle>
      <BigOverview>{overview}</BigOverview>
    </Col>
  ) : null;
};

export default Overview;
