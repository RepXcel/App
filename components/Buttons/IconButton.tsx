import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

import IonIcon from "@expo/vector-icons/Ionicons";

import { StyleProp, ViewStyle, GestureResponderEvent } from "react-native";

const StyledView = styled.TouchableOpacity`
  flex-direction: column;
  width: 45px;
  height: 45px;
  border-radius: 15px;
`;

const StyledIcon = styled(IonIcon)`
  align-self: "center";
`;

interface IconButtonProps {
  iconName: React.ComponentProps<typeof IonIcon>["name"];
  color?: string;
  size?: number;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const IconButton: FunctionComponent<IconButtonProps> = (props) => {
  return (
    <StyledView onPress={props.onPress} style={props.iconContainerStyle}>
      <IonIcon
        name={props.iconName}
        style={props.iconStyle}
        color={props.color}
        size={props.size}
      />
    </StyledView>
  );
};

export default IconButton;
