import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";

const DisplayContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

const Display: FunctionComponent = () => {
  return (
    <DisplayContainer>
      <StatusBar />
    </DisplayContainer>
  );
};

export default Display;
