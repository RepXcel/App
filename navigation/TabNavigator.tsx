import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// vector icon packages
import IonIcon from "@expo/vector-icons/Ionicons";

// screens
import Display from "../screens/Display";
import Bluetooth from "../screens/Bluetooth";
import History from "../screens/History";
import Settings from "../screens/Settings";

// custom components
import { colors } from "../components/colors";
import Title from "../components/Header/Title";
import Logo from "../components/Header/Logo";

//images
import LogoIcon from "../assets/icons/Logo.png";

export type TabParamList = {
  Display: undefined;
  Bluetooth: undefined;
  History: undefined;
  Settings: undefined;
  Instructions: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        // BOTTOM NAVBAR ------------------------
        // attempt to show labels on focused --> doesn't work since tabBarShowLabel cannot be dynamically set
        // tabBarShowLabel: navigation.isFocused(),
        tabBarShowLabel: false,
        tabBarStyle: {
          //backgroundColor: colors.primary,
          height: 60,
        },
        tabBarInactiveTintColor: colors.darkgray,
        tabBarActiveTintColor: colors.primary,

        // HEADER ------------------------
        // headerShown: false,
        headerTintColor: colors.secondary,
        headerStyle: {
          backgroundColor: colors.lightgray,
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
          height: 120,
        },
        headerRightContainerStyle: { paddingRight: 25 },
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerRight: () => (
          <Logo
            img={LogoIcon}
            imgContainerStyle={{ backgroundColor: colors.tertiary }}
          />
          // <IconButton
          //   iconName='settings-outline'
          //   color={colors.darkgray}
          //   size={30}
          //   onPress={() => {
          //     navigation.navigate("Settings");
          //   }}
          // />
        ),
      })}
    >
      <Tab.Screen
        name='Display'
        component={Display}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name='home-outline' color={color} size={size} />
          ),
          headerTitle: (props) => (
            <Title
              mainText='Amanda Nguyen'
              subText='Welcome back!'
              {...props}
            />
          ),
          headerLeft: () => <></>,
        }}
      />
      <Tab.Screen
        name='Bluetooth'
        component={Bluetooth}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name='bluetooth-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='History'
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name='calendar-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name='settings-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
