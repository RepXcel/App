import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle } from "react-native";

// custom components
import { useThemeContext } from "../colors";
import RegularText from "../Texts/RegularText";
import SmallText from "../Texts/SmallText";

const StyledView = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

interface GreetingProps {
  mainText: string;
  subText: string;
  mainTextStyles?: StyleProp<TextStyle>;
  subTextStyles?: StyleProp<TextStyle>;
}

const Greeting: FunctionComponent<GreetingProps> = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledView>
      <RegularText
        textStyles={[
          {
            fontSize: 22,
            minHeight: 30,
            fontFamily: "Lato-Bold",
          },
          props.mainTextStyles,
        ]}
      >
        {props.mainText}
      </RegularText>
      <SmallText
        textStyles={[
          {
            color: theme.accentText,
            fontSize: 17,
            minHeight: 25,
          },
          props.subTextStyles,
        ]}
      >
        {props.subText}
      </SmallText>
    </StyledView>
  );
};

export default Greeting;
