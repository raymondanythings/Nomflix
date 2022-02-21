import React from "react";
import styled from "styled-components";
import { makeImagePath } from "../lib/utils";

const Img = styled.img<{ isProv?: boolean }>`
  width: 120px;
  ${(props) => (props.isProv ? "" : "height: 120px; border-radius: 50%;")}
  margin: 10px;
  box-shadow: ${(props) =>
    props.isProv ? null : "1px 1px 2px 1px rgba(0, 0, 0, 0.5)"};
`;

const Empty = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 10px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
`;

const LogoImg: React.FC<{
  path: string;
  size?: string;
  name?: string;
  title?: string;
}> = ({ path, size, name, title }) => {
  return path ? (
    <Img
      src={makeImagePath(path, size)}
      alt={name}
      isProv={title === "Providers" || title === "Networks"}
    />
  ) : (
    <Empty src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEUAAAD///9bWVrm5uaqqqqgoKBPT0/z8/ORkZHg4OB1dXWzs7PU1NTr6+vv7+86OjqAfn/MzMxsbGyXl5fAwMCHh4djY2PHx8dfX1+dnZ1ISEguLi66urpVVVV3d3evr69BQUElJSUvLy8MDAwXFxes5b5hAAADzUlEQVR4nO3b23LaMBSFYQljsDEQGxtIiM2hzfs/Y6UtnEna5EITSbDo+i8am4LQF587U1UPk0duqNWgHrtBTW49hchNKISPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvyCCk/TUJ3CTSqoUIcr3KQo9MrMrHzJf9pLedfCuxpHotArClOPI1HoFYWpx5Eo9IrC1ONIFHpFYepxJAq9ojD1OBKFXlGYehyJQq8oTD2ORKFXFKYeR6LQKwpTjyNR6BWFqceRKPSKwtTjSBR6RWHqcSQKvaIw9TgShV5RmHociUKvKEw9jkShVxSmHkei0CsKU48jUegVhanHkSj0isLU40gUekVh6nEkCr0yM5seZj/tML1rYajCTYpCr7JgrcJNiv9bHT8K8aMQv9sLL23c8W8uzPUy7hfcWljrRxcutG7ifkMUYd3vq4VdeO2rWg39shvMcrVstua1Q1Ud1bYpm41Zafdar6YnVVTuA3ZhF3YyEYSvc7l3Xl+UOmtd5bJWb+SH2SPNQlXKSqfU+nqfvTVQ+bBZ+RV2OhGEBrjuM63nIpzr8iSO+Wlp/lyonV1ZCfJFlfa3sV6L7EkJvww8nfDCqTt39Fq3VqinSuZvvGpp13Zu6yn3nLu5Hofm7bn50Wm9DTyf8MK52xrKbo3z9UlvZbn2yqB7EY5v3NkzjZxLZ243Dfpk6AovtLvi8Xi0x516cttOZXb3NKcRu/WMMJM3NloX70L7Szjbvwt+Zg0uvHx8UB+F5qB7Vlfh82jq7IH4LmztHmz21U3Y6UQQ/jaybSG13wndafPzNjSfW8fYSePspW/j8gehvcqNQveGT8ehgM01owo8mxjCvZvmptn33wobt6LlnuZ6eXAXzFng2cQQ2vNnt2ntzvqlcCK3A5W9OLZyDtXLprBvktcDT0ZFueLX1/NM9dVeurfCLBvvaWRfdddMuUDmoScT5770qc/m68aSLvtODqy86+zut+u6wgpLVSyzxp01L325ymq7dHZ3bMdt2Gt++meLYbwe/l0rh+SszRdB773vRziRI1dN2vw56DXxXoRyYMoxu62LoN93E+EXZ0wBnmN8X3rh2+xw/vfVTVEEfvIdu/W/YsSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjEj0L8KMSPQvwoxI9C/CjE738QDreeQuQGVQ+TR26o/wC/TiXuOSy+6AAAAABJRU5ErkJggg==" />
  );
};

export default LogoImg;
