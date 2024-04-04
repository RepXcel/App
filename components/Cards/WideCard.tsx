import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../colors";

const Card = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  min-height: 90px;
  border-radius: 20px;
  width: 100%;
  border: 1px ${(props) => props.theme.accentGray};
`;
// margin: 3px;
// width: (100% - 6px);
// elevation: 3;
// border-color: ${(props) => props.theme.accentText};

// Use a generic type parameter T for the CardProps
import { CardProps } from "./types";

// Use the generic type parameter T for the FunctionComponent
const WideCard: FunctionComponent<CardProps<any>> = (props) => {
  const { theme } = useThemeContext();

  return (
    <Card style={props.viewStyles} onPress={props.onPress} theme={theme}>
      {props.children}
    </Card>
  );
};

export default WideCard;
