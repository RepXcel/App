import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  AnimatedProp,
  Canvas,
  LinearGradient,
  Path,
  PathDef,
  Skia,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { line, curveBasis } from "d3";

import colors from "../colors";
import styled from "styled-components/native";

const dimension = Dimensions.get("window");
const width = dimension.width;
const height = dimension.height;
const frequency = 2;
const initialAmplitude = 30;
const initialVerticalOffset = 80;

const waveColor = colors.colors.primary;
const topGradientColor = colors.colors.black + "60";
const bottomGradientColor = colors.colors.black;

const WaveAnimationContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const WaveAnimation: React.FC = () => {
  const verticalOffset = useValue(initialVerticalOffset);
  const amplitude = useValue(initialAmplitude);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setClock((prevClock) => (prevClock + 0.02) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const createWavePath = (phase = 20, reverse = false) => {
    const points = Array.from({ length: width }, (_, index) => {
      const angle = (index / width) * (Math.PI * frequency) + phase + clock;
      const x = reverse ? width - index : index; // Reverse the x-coordinate if reverse is true
      return [
        x,
        height - (amplitude.current * Math.sin(angle) + verticalOffset.current), // Subtract from height
      ];
    });

    if (reverse) {
      points.reverse();
    }

    // Add an extra point at the end of the wave
    points.push([width, points[points.length - 1][1]]);
    // Add an extra point at the start of the wave
    points.unshift([0, points[0][1]]);

    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(points.map((point) => [point[0], point[1]]));
    const bottomLine = `L${width},${0} L${0}, ${0}`; // Change to 0
    return `${waveLine} ${bottomLine} Z`;
  };

  const path1 = Skia.Path.MakeFromSVGString(createWavePath());
  const path2 = Skia.Path.MakeFromSVGString(createWavePath(Math.PI, true));

  const gradientStart = vec(0, height - verticalOffset.current); // Subtract from height
  const gradientEnd = vec(0, height - (verticalOffset.current + 500)); // Subtract from height

  const onTouchHandler = useTouchHandler({
    onActive: ({ y }) => {
      if (y < height - initialVerticalOffset) {
        // Subtract from height
        verticalOffset.current = Math.max(0, height - y); // Subtract from height
      }
    },
  });

  return (
    <WaveAnimationContainer>
      <View style={styles.container}>
        <Canvas style={styles.canvas} onTouch={onTouchHandler}>
          <Path
            path={path1 as AnimatedProp<PathDef, any>}
            style={"fill"}
            color={waveColor}
          >
            <LinearGradient
              start={gradientStart}
              end={gradientEnd}
              colors={[topGradientColor, bottomGradientColor]}
            />
          </Path>
          <Path
            path={path2 as AnimatedProp<PathDef, any>}
            style={"fill"}
            color={waveColor}
          >
            <LinearGradient
              start={gradientStart}
              end={gradientEnd}
              colors={[topGradientColor, bottomGradientColor]}
            />
          </Path>
        </Canvas>
      </View>
    </WaveAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: waveColor,
  },
  canvas: {
    flex: 1,
  },
});
