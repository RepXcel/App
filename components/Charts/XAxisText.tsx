import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import { useThemeContext } from "../colors";

type Props = {
  x: number;
  y: number;
  text: string;
};

const XAxisText = ({ x, y, text }: Props) => {
  const { theme } = useThemeContext();

  const font = useFont(require("../../assets/fonts/Lato-Bold.ttf"), 14);
  if (!font) return null;
  const fontSize = font.getSize();
  return (
    <Text
      font={font}
      x={x + fontSize / 1.8}
      y={y}
      text={text}
      color={theme.primary}
    />
  );
};

export default XAxisText;
