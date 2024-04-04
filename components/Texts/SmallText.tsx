import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../colors";

const StyledText = styled.Text`
  font-size: 15px;
  min-height: 20px;
  color: ${(props) => props.theme.accentText};
  text-align: left;
  font-family: Lato-Regular;
`;

import { TextProps } from "./types";

const SmallText: FunctionComponent<TextProps> = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledText style={props.textStyles} theme={theme}>
      {props.children}
    </StyledText>
  );
};

export default SmallText;
