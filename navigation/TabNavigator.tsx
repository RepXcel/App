import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useIsFocused } from "@react-navigation/native";

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
import BigText from "../components/Texts/BigText";

export type TabParamList = {
  Display: undefined;
  Bluetooth: undefined;
  History: undefined;
  Settings: undefined;
  Instructions: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const isFocused = useIsFocused();
  // Use useFocusEffect to update isFocused when the focus changes

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        // BOTTOM NAVBAR ------------------------
        // attempt to show labels on focused --> doesn't work since tabBarShowLabel cannot be dynamically set
        // tabBarShowLabel: navigation.isFocused  (),
        tabBarShowLabel: false,
        tabBarStyle: {
          //backgroundColor: colors.primary,
          height: 60,
        },
        tabBarInactiveTintColor: colors.darkgray,
        tabBarActiveTintColor: colors.primary,
        // Use non-outline icon when focused
        tabBarIcon: ({ color, size }) => {
          let iconName = "home-outline";
          switch (route.name) {
            case "Display":
              iconName = isFocused ? "home" : "home-outline";
              break;
            case "History":
              iconName = isFocused ? "time" : "time-outline";
              break;
            case "Bluetooth":
              iconName = isFocused ? "bluetooth" : "bluetooth-outline";
              break;
            case "Settings":
              iconName = isFocused ? "settings" : "settings-outline";
              break;
            default:
              iconName = "home-outline";
          }
          return <IonIcon name={iconName as any} color={color} size={size} />;
        },

        // HEADER ------------------------
        // headerShown: false,
        headerStyle: {
          backgroundColor: colors.white,
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
          // tabBarIcon: ({ color, size }) => (
          //   <IonIcon name='home-outline' color={color} size={size} />
          // ),
          headerTitle: (props) => (
            <Title
              mainText={props.children}
              subText='Amanda Nguyen'
              {...props}
            />
          ),
          headerLeft: () => <></>,
        }}
      />
      <Tab.Screen
        name='History'
        component={History}
        options={{
          headerTitleStyle: {
            color: "red",
          },
          headerTitle: (props) => (
            <Title
              mainText={props.children}
              subText='Amanda Nguyen'
              {...props}
            />
          ),
          // tabBarIcon: ({ color, size }) => (
          //   <IonIcon name='time-outline' color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name='Bluetooth'
        component={Bluetooth}
        options={{
          headerTitle: (props) => (
            <Title
              mainText={props.children}
              subText='Amanda Nguyen'
              {...props}
            />
          ),
          //   tabBarIcon: ({ color, size }) => (
          //     <IonIcon name='bluetooth-outline' color={color} size={size} />
          //   ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          headerTitle: (props) => (
            <Title
              mainText={props.children}
              subText='Amanda Nguyen'
              {...props}
            />
          ),
          //   tabBarIcon: ({ color, size }) => (
          //     <IonIcon name='settings-outline' color={color} size={size} />
          //   ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
