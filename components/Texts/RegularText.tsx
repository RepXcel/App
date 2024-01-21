import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const StyledText = styled.Text`
  font-size: 18px;
  color: ${colors.secondary};
  text-align: left;
  font-family: Lato-Bold;
`;

import { TextProps } from "./types";

const RegularText: FunctionComponent<TextProps> = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};

export default RegularText;
