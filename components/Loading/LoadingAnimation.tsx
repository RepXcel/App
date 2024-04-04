import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { useThemeContext } from "../colors";

const verticalDimension = 250;
const BarbellAnimation: React.FC = () => {
  const { theme } = useThemeContext(); // Use the theme context
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: verticalDimension,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.barbell, { transform: [{ translateY: moveAnim }] }]}
      >
        <View style={[styles.weight, { backgroundColor: theme.tertiary }]} />
        <View style={[styles.bar, { backgroundColor: theme.tertiary }]} />
        <View style={[styles.weight, { backgroundColor: theme.tertiary }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: verticalDimension, // Add padding to prevent cut off
  },
  barbell: {
    flexDirection: "row",
    alignItems: "center",
  },
  weight: {
    width: 20,
    height: 60,
    borderRadius: 25,
    backgroundColor: "black",
  },
  bar: {
    height: 10,
    width: 150,
    backgroundColor: "black",
  },
});

export default BarbellAnimation;
