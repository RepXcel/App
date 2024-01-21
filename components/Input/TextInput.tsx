import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { StyleProp, TextStyle } from "react-native";

import IonIcon from "@expo/vector-icons/Ionicons";

const InputContainer = styled.View`
  align-items: left;
  background-color: ${colors.white};
  border: ${colors.darkgray};
  text-decoration: none;
  width: 80%;
  height: 50;
  justify-content: left;
  padding: 8px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
`;

const IconContainer = styled.View`
  padding-right: 8px;
  justify-content: center;
  top: -1px;
`;

const StyledTextInput = styled.TextInput`
  justify-content: center;
  font-size: 18px;
  padding: 0px;
  color: ${colors.secondary};
  text-decoration-line: none;
  text-align: left;
  font-family: Lato-Bold;
`;

const StyledPlaceholderText = styled.TextInput``;

interface TextInputProps {
  textStyles?: StyleProp<TextStyle>;
  placeholderTextStyles?: StyleProp<TextStyle>;
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
        style={props.textStyles}
        secureTextEntry={props.secureTextEntry}
      ></StyledTextInput>
    </InputContainer>
  );
};

export default TextInput;
