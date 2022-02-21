import React from "react";
import {
  BigCover,
  BigTitle,
  LinkIcon,
  TopContentWrapper,
  VoteAvg,
} from "../lib/styled";
import { makeImagePath } from "../lib/utils";

interface ICoverProps {
  homepage: string;
  average: number;
  name: string;
  path: string;
}

const Cover: React.FC<ICoverProps> = ({ homepage, average, name, path }) => {
  const openBrowser = (url: string) => window.open(url);

  return (
    <BigCover
      style={{
        backgroundImage: `linear-gradient(to top , black,transparent), url(${makeImagePath(
          path,
          "w500"
        )})`,
      }}
    >
      <TopContentWrapper>
        <VoteAvg>⭐️{average}/10</VoteAvg>
        {homepage && <LinkIcon onClick={() => openBrowser(homepage)} />}
      </TopContentWrapper>
      <BigTitle>{name}</BigTitle>
    </BigCover>
  );
};

export default Cover;
