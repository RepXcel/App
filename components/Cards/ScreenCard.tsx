import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const Card = styled.TouchableOpacity`
  min-width: 0%;
  min-height: 100%;
  margin-right: 25px;
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 20px;
  border: 1px red;
`;

// Use a generic type parameter T for the CardProps
import { CardProps } from "./types";

// Use the generic type parameter T for the FunctionComponent
const ScreenCard: FunctionComponent<CardProps<any>> = (props) => {
  return (
    <Card style={props.viewStyles} onPress={props.onPress}>
      {props.children}
    </Card>
  );
};

export default ScreenCard;
