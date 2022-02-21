import { motion } from "framer-motion";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";

const Wrapper = styled(motion.div)<{ main?: boolean }>`
  width: 100%;
  height: ${(props) => (props.main ? "100vh" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader: React.FC<{ main?: boolean }> = ({ main }) => {
  return (
    <Wrapper main={main}>
      <TailSpin color="white" height={80} width={80} />
    </Wrapper>
  );
};

export default Loader;
