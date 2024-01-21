import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { StyleProp, TextStyle } from "react-native";

import IonIcon from "@expo/vector-icons/Ionicons";

const InputContainer = styled.View`
  background-color: ${colors.white};
  border: ${colors.darkgray};
  border-radius: 20px;
  width: 80%;
  height: 50px;
  padding: 10px;
  margin: 10px;
  flex-direction: row;
`;

const IconContainer = styled.View`
  padding-right: 8px;
  justify-content: center;
  top: -1px;
`;

const StyledTextInput = styled.TextInput`
  font-size: 18px;
  color: ${colors.secondary};
  font-family: Lato-Bold;
  width: 90%;
  border-radius: 8px;
`;

interface TextInputProps {
  textStyles?: StyleProp<TextStyle>;
  placeholderTextStyles?: StyleProp<TextStyle>;
  placeholderColor?: string;
  children: string;
  iconName?: React.ComponentProps<typeof IonIcon>["name"];
  secureTextEntry?: boolean;
}

const TextInput: FunctionComponent<TextInputProps> = (props) => {
  return (
    <InputContainer>
      <IconContainer>
        <IonIcon
          name={props.iconName}
          style={{ alignSelf: "center" }}
          color={colors.darkgray}
          size={18}
        />
      </IconContainer>
      <StyledTextInput
        placeholder={props.children}
        placeholderTextColor={
          props.placeholderColor === undefined
            ? colors.darkgray
            : props.placeholderColor
        }
        style={props.textStyles}
        secureTextEntry={props.secureTextEntry}
      ></StyledTextInput>
    </InputContainer>
  );
};

export default TextInput;
