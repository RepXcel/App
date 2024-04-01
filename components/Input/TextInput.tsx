import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle } from "react-native";

import IonIcon from "@expo/vector-icons/Ionicons";

import { useThemeContext } from "../colors";

const InputContainer = styled.View`
  background-color: transparent;
  border: ${(props) => props.theme.accentGray};
  border-radius: 20px;
  width: 80%;
  height: 50px;
  padding: 10px;
  margin: 10px;
  flex-direction: row;
`;

const IconContainer = styled.View`
  padding-left: 15px;
  padding-right: 8px;
  justify-content: center;
  top: -1px;
`;

const StyledTextInput = styled.TextInput`
  font-size: 17px;
  font-family: Lato-Bold;
  width: 90%;
  border-radius: 8px;
  color: ${(props) => props.theme.text};
`;

interface TextInputProps {
  textStyles?: StyleProp<TextStyle>;
  placeholderTextStyles?: StyleProp<TextStyle>;
  placeholderColor?: string;
  children: string;
  iconName?: React.ComponentProps<typeof IonIcon>["name"];
  secureTextEntry?: boolean;
  onTextInput?: (text: string) => void;
}

const TextInput: FunctionComponent<TextInputProps> = (props) => {
  const { theme } = useThemeContext(); // access the theme object

  return (
    <InputContainer theme={theme}>
      <IconContainer>
        <IonIcon
          name={props.iconName}
          style={{ alignSelf: "center" }}
          color={theme.text}
          size={18}
        />
      </IconContainer>
      <StyledTextInput
        placeholder={props.children}
        onChangeText={props.onTextInput}
        placeholderTextColor={
          props.placeholderColor === undefined
            ? theme.buttonGray
            : props.placeholderColor
        }
        style={props.textStyles}
        secureTextEntry={props.secureTextEntry}
        theme={theme}
      ></StyledTextInput>
    </InputContainer>
  );
};

export default TextInput;
