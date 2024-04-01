import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../colors";

const Card = styled.TouchableOpacity`
  min-width: 0%;
  min-height: 100%;
  margin-right: 25px;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  border-radius: 20px;
  border: 1px ${(props) => props.theme.accentGray} solid;
`;

// Use a generic type parameter T for the CardProps
import { CardProps } from "./types";

// Use the generic type parameter T for the FunctionComponent
const ScreenCard: FunctionComponent<CardProps<any>> = (props) => {
  const { theme } = useThemeContext();

  return (
    <Card
      style={props.viewStyles}
      onPress={props.onPress}
      activeOpacity={props.activeOpacity}
      theme={theme}
    >
      {props.children}
    </Card>
  );
};

export default ScreenCard;
