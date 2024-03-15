import React from "react";

// custom font
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

// navigation
import RootStack from "./navigation/AppStack";

// screens
import Register from "./screens/Welcome";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <RootStack />;
}