import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import {
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";

const StyledView = styled.TouchableOpacity`
  flex-direction: column;
  width: 45px;
  height: 45px;
`;
// border-radius: 15px;

const StyledImage = styled.Image`
  resize-mode: cover;
  width: 100%;
  height: 100%;
`;
// border-radius: 15px;

interface LogoProps {
  img: ImageSourcePropType;
  imgStyle?: StyleProp<ImageStyle>;
  imgContainerStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Logo: FunctionComponent<LogoProps> = (props) => {
  return (
    <StyledView onPress={props.onPress} style={props.imgContainerStyle}>
      <StyledImage style={props.imgStyle} source={props.img} />
    </StyledView>
  );
};

export default Logo;
