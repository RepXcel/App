import React, { FunctionComponent, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styled from "styled-components/native";
import { colors } from "../colors";
import { useWindowDimensions } from "react-native";
import { Canvas, Group } from "@shopify/react-native-skia";
import { Velocity } from "../../data/dataStructure";
import * as d3 from "d3";
import BarPath from "./BarPath";
import XAxisText from "./XAxisText";
import { useSharedValue, withTiming } from "react-native-reanimated";

const StyledView = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.white};
`;

interface BarChartProps {
  velocities: Velocity[];
}

const BarChart: FunctionComponent<BarChartProps> = (props) => {
  const { width, height } = useWindowDimensions();
  const progress = useSharedValue<number>(0);

  const canvasWidth = width - 92;
  const canvasHeight = height / 4.3;

  const graphMargin = 30;
  const graphWidth = canvasWidth - graphMargin;
  const graphHeight = canvasHeight - graphMargin;

  const barWidth = 17;

  const xRange = [0, graphWidth];

  const xDomain = props.velocities.map((xDataPoint: Velocity) =>
    xDataPoint.rep.toString()
  );

  const x = d3.scalePoint().domain(xDomain).range(xRange);

  const yRange = [0, graphHeight];
  const yDomain = [
    0,
    d3.max(props.velocities, (yDataPoint: Velocity) => yDataPoint.velocity)!,
    // || 0,
  ];

  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  useFocusEffect(() => {
    const animation = withTiming(1, { duration: 1000 });
    progress.value = animation;

    return () => {
      // Cleanup function if needed
      progress.value = 0; // Reset animation progress when component unmounts or loses focus
    };
  });

  return (
    <StyledView activeOpacity={1}>
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: `${colors.white}`,
        }}
      >
        {props.velocities.map((dataPoint: Velocity, index) => (
          <Group key={index}>
            <BarPath
              x={x(dataPoint.rep.toString())!}
              y={y(dataPoint.velocity)}
              barWidth={barWidth}
              graphHeight={graphHeight}
              progress={progress}
            />
            <XAxisText
              x={x(dataPoint.rep.toString())!}
              y={canvasHeight}
              text={dataPoint.velocity.toString()}
            />
          </Group>
        ))}
      </Canvas>
    </StyledView>
  );
};

export default BarChart;
