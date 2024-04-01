import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { useThemeContext } from "../colors";

type Props = {
  x: number;
  y: number;
  barWidth: number;
  graphHeight: number;
  progress: SharedValue<number>;
};

const BarPath = ({ x, y, barWidth, graphHeight, progress }: Props) => {
  const { theme } = useThemeContext();

  const path = useDerivedValue(() => {
    const BarPath = Skia.Path.Make();
    BarPath.addRRect({
      rect: {
        x: x + barWidth / 2,
        y: graphHeight,
        width: barWidth,
        height: y !== 0 ? y * -1 * progress.value : 0,
      },
      rx: 5,
      ry: 5,
    });
    return BarPath;
  });

  return <Path path={path} color={theme.primary} />;
};

export default BarPath;
