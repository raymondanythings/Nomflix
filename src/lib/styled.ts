import styled from "styled-components";
import { GiEarthAmerica } from "react-icons/gi";

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;
  height: 400px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px;
  padding-right: 40px;
`;

export const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 48px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BigContent = styled.div`
  padding: 20px;
  position: relative;
`;
export const BigOverview = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px 30px;
  text-align: center;
`;

export const VoteAvg = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const LabelTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
`;

export const TopContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Production = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 5px;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  padding: 5px 10px;
  color: black;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  font-weight: 500;
`;

export const WhiteBox = styled(Production)`
  white-space: nowrap;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
`;

export const LinkIcon = styled(GiEarthAmerica)`
  margin-left: 10px;
  cursor: pointer;
`;

export const BoxContent = styled.div<{ seasons?: boolean }>`
  display: flex;
  ${(props) =>
    props.seasons
      ? "overflow-x : scroll; width: 100%;"
      : "justify-content: center"};
  margin: 10px 0px;
`;

// export const Contry = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
//   padding: 10px;
//   background-color: white;
//   border-radius: 10px;
// `;

export const ContryName = styled.div`
  width: 4rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
