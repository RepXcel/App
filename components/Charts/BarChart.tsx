import React, { FunctionComponent, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styled from "styled-components/native";
import { useThemeContext } from "../colors";
import { useWindowDimensions } from "react-native";
import { Canvas, Group } from "@shopify/react-native-skia";
import * as d3 from "d3";
import BarPath from "./BarPath";
import XAxisText from "./XAxisText";
import { useSharedValue, withTiming } from "react-native-reanimated";

const StyledView = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

interface BarChartProps {
  velocities: number[];
}

const BarChart: FunctionComponent<BarChartProps> = (props) => {
  const { theme } = useThemeContext();

  const { width, height } = useWindowDimensions();
  const progress = useSharedValue<number>(0);

  const canvasWidth = width - 92;
  const canvasHeight = height / 4.3;

  const graphMargin = 30;
  const graphWidth = canvasWidth - graphMargin;
  const graphHeight = canvasHeight - graphMargin;

  const barWidth = 17;

  const xRange = [0, graphWidth];

  const xDomain: string[] = props.velocities.map((dataPoint, index) =>
    (index + 1).toString()
  );
  const x = d3.scalePoint().domain(xDomain).range(xRange);

  const yRange = [0, graphHeight];
  const yDomain = [
    0,
    d3.max(props.velocities, (yDataPoint: number) => yDataPoint)!,
    // || 0,
  ];

  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  useFocusEffect(() => {
    // progress.value = 0; // Reset animation progress when component unmounts or loses focus
    setTimeout(() => {
      // Code to execute after half a second delay
      const animation = withTiming(1, { duration: 1000 });
      progress.value = animation;
    }, 800);

    // return () => {
    //   progress.value = 0; // Reset animation progress when component unmounts
    // };
  });

  return (
    <StyledView activeOpacity={1} theme={theme}>
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: theme.background,
        }}
      >
        {props.velocities.map((dataPoint: number, index) => (
          <Group key={index}>
            <BarPath
              x={x((index + 1).toString())!}
              y={y(dataPoint)}
              barWidth={barWidth}
              graphHeight={graphHeight}
              progress={progress}
            />
            <XAxisText
              x={x((index + 1).toString())!}
              y={canvasHeight}
              text={dataPoint === Math.max(...props.velocities) || dataPoint === Math.min(...props.velocities) ? dataPoint.toFixed(2).toString() : ""}
            />
          </Group>
        ))}
      </Canvas>
    </StyledView>
  );
};

export default BarChart;
