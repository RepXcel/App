import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";

export const colors = {
  white: "#ffffff",
  lightGray: "#F3F2F5",
  gray: "#B1B1B9",
  darkGray: "#67666C",
  darkDarkGray: "#434348",
  lightBlack: "#121213",
  black: "#000000",
  primary: "#55DBF6",
  secondary: "#1F152D",
  tertiary: "#17A8C5",
  pink: "#ff7b95",
  accent: "#0E102A",
};

export const light = {
  background: colors.white,
  accentBackground: colors.lightGray,
  text: colors.black,
  accentText: colors.darkGray,
  accentGray: colors.gray,
  waveTitle: colors.primary,
  waveAccent: colors.white,
  waveBackground: colors.white,
  wavePrimary: colors.tertiary,
  button: colors.primary,
  buttonGray: colors.gray,
  statusBar: "dark",

  ...colors,
};

export const dark = {
  background: colors.lightBlack,
  accentBackground: colors.black,
  text: colors.white,
  accentText: colors.lightGray,
  accentGray: colors.darkDarkGray,
  waveTitle: colors.white,
  waveAccent: colors.accent,
  waveBackground: colors.black,
  wavePrimary: colors.primary,
  button: colors.tertiary,
  buttonGray: colors.darkGray,
  statusBar: "light",

  ...colors,
};

export const ThemeContext = createContext<{
  theme: typeof light | typeof dark;
  toggleTheme: () => void;
}>({ theme: light, toggleTheme: () => {} });

export const useThemeContext = () => useContext(ThemeContext);

export default { colors, light, dark, ThemeContext, useThemeContext };
