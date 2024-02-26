import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import '@azure/core-asynciterator-polyfill';
import { DataStore } from 'aws-amplify/datastore';
import { User } from "./src/models";

const App = () => {
  const [num, setNum] = useState(0);

  const testSavingDatastore = async () => {
    try {
      const post = await DataStore.save(
        new User({
          username: `user${num}`,
        })
      );
      setNum(num + 1);
      console.log('Username saved successfully!', post);
    } catch (error) {
      console.log('Error saving username', error);
    }
  };

  const testRetrievingDatastore = async () => {
    try {
      const users = await DataStore.query(User);
      console.log('Users retrieved successfully!', JSON.stringify(users, null, 2));
    } catch (error) {
      console.log('Error retrieving Users', error);
    }
  };

  const testDeletingDatastore = async () => {
    try {
      await DataStore.clear();
      console.log('User cleared successfully!');
    } catch (error) {
      console.log('Error deleting User', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
      </View>
      <TouchableOpacity
        onPress={testSavingDatastore}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Test Saving"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testRetrievingDatastore}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Test Retrieving"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={testDeletingDatastore}
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