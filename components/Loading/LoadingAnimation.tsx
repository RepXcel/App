import React, { FunctionComponent, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styled from "styled-components/native";
import { useThemeContext } from "../colors";
import { useWindowDimensions } from "react-native";
import { Canvas, Group } from "@shopify/react-native-skia";
import * as d3 from "d3";
import { useSharedValue, withTiming } from "react-native-reanimated";

const StyledView = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.black};
`;

const LoadingComponent: FunctionComponent = () => {};

export default LoadingComponent;
