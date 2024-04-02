import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../colors";

const StyledText = styled.Text`
  font-size: 36px;
  min-height: 45px;
  color: ${(props) => props.theme.text};
  text-align: left;
  font-family: Lato-Bold;
`;

import { TextProps } from "./types";

const BigText: FunctionComponent<TextProps> = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledText style={props.textStyles} theme={theme}>
      {props.children}
    </StyledText>
  );
};

export default BigText;
