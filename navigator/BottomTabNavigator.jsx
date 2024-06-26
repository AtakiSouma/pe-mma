import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome,AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteListScreen";
import { appColor } from "../constants/theme";
import FilterScreen from "../screens/FilterScreen";
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    
  },
};
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="home"
                size={30}
                color={focused ? appColor.primary : appColor.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="favorite"
                size={30}
                color={focused ? appColor.primary : appColor.gray2}
              />
            );
          },
        }}
      />
       <Tab.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="filter"
                size={30}
                color={focused ? appColor.primary : appColor.gray2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
