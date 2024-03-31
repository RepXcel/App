export const colors = {
  white: "#ffffff",
  lightgray: "#F7F7F7",
  gray: "#B4B4B4",
  darkgray: "#848484",
  darkdarkgray: "#4A4A4A",
  black: "#141414",
  primary: "#6CDFF6",
  secondary: "#1F152D",
  tertiary: "#FF7B95",
  accent: "#fbcd77",
};

const light = {
  background: colors.white,
  accentBackground: colors.lightgray,
  text: colors.black,
  accentText: colors.darkgray,

  ...colors,
};

const dark = {
  background: colors.darkdarkgray,
  accentBackground: colors.black,
  text: colors.white,
  accentText: colors.lightgray,

  ...colors,
};

export default { colors, light, dark };
