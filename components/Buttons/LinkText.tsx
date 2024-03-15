import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import RegularText from "../Texts/RegularText";
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";

const StyledView = styled.TouchableOpacity`
  height: 30px;
  width: fit-content;
`;

interface LinkTextProps {
  LinkTextContainerStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  textStyles?: StyleProp<TextStyle>;
  children: ReactNode;
}

const LinkText: FunctionComponent<LinkTextProps> = (props) => {
  return (
    <StyledView onPress={props.onPress} style={props.LinkTextContainerStyle}>
      <RegularText textStyles={props.textStyles}>{props.children}</RegularText>
    </StyledView>
  );
};

export default LinkText;
