import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import '@azure/core-asynciterator-polyfill';

import localStorage from "./localStorage";

const App = () => {
  const { saveData, retrieveData, clearData } = localStorage();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
      </View>
      <TouchableOpacity
        onPress={() => saveData("test data")}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Test Saving"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={retrieveData}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Test Retrieving"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clearData}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Test Deleting"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;