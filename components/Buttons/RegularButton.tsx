import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// components
import { useThemeContext } from "../colors";
import RegularText from "../Texts/RegularText";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${(props) => props.theme.button};
  width: 100%;
  padding: 13px;
  border-radius: 20px;
`;

//types
interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  textStyles?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const BottomButtonContainer = styled.View`
  width: 100%;
  padding: 40px;
  padding-bottom: 20px;
`;

const RegularButton: FunctionComponent<ButtonProps> = (props) => {
  const { theme } = useThemeContext();
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles} theme={theme}>
      <RegularText
        textStyles={(props.textStyles, { color: theme.white, height: 25 })}
      >
        {props.children}
      </RegularText>
    </ButtonView>
  );
};

export default RegularButton;
