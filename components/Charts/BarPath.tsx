import { View, Text } from "react-native";
import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { colors } from "../colors";

type Props = {
  x: number;
  y: number;
  barWidth: number;
  graphHeight: number;
  progress: SharedValue<number>;
};

const BarPath = ({ x, y, barWidth, graphHeight, progress }: Props) => {
  const path = useDerivedValue(() => {
    const BarPath = Skia.Path.Make();
    BarPath.addRRect({
      rect: {
        x: x + barWidth / 2,
        y: graphHeight,
        width: barWidth,
        height: y * -1 * progress.value,
      },
      rx: 5,
      ry: 5,
    });
    return BarPath;
  });

  return <Path path={path} color={`${colors.primary}`} />;
};

export default BarPath;
