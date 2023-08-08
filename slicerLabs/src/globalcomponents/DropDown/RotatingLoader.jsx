import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid lightblue;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const RotatingLoader = () => {
  return <LoaderContainer />;
};

export default RotatingLoader;
