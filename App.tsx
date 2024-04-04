import React, { createContext, useContext, useEffect, useState } from "react";

// custom font
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// navigation
import RootStack from "./navigation/AppStack";

// screens
import Register from "./screens/Welcome";
import { View } from "react-native";

// contexts
import { BleContext, UserContext } from "./src/Contexts";
import useBLE from "./src/backend/useBLE";
import { ThemeContext, light, dark } from "./components/colors";

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [username, setUsername] = React.useState("");

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    batteryData,
    disconnectFromDevice,
    startStreamingData,
    stopStreamingData,
    velocityData,
  } = useBLE();

  const [theme, setTheme] = useState(dark);

  const toggleTheme = () => {
    console.log("Toggling theme");
    console.log(theme);
    setTheme(theme === light ? dark : light);
  };

  let [fontsLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserContext.Provider
        value={{
          username,
          setUsername,
        }}
      >
        <BleContext.Provider
          value={{
            requestPermissions,
            scanForPeripherals,
            allDevices,
            connectToDevice,
            connectedDevice,
            batteryData,
            disconnectFromDevice,
            startStreamingData,
            stopStreamingData,
            velocityData,
          }}
        >
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <RootStack />
          </ThemeContext.Provider>
        </BleContext.Provider>
      </UserContext.Provider>
    </View>
  );
}
