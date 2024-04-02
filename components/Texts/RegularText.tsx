import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../colors";

const StyledText = styled.Text`
  font-size: 18px;
  min-height: 32px;
  color: ${(props) => props.theme.text};
  text-align: left;
  font-family: Lato-Regular;
`;

import { TextProps } from "./types";

const RegularText: FunctionComponent<TextProps> = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledText style={props.textStyles} theme={theme}>
      {props.children}
    </StyledText>
  );
};

export default RegularText;
