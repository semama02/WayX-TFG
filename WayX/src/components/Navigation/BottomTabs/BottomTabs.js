import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTranslation } from "react-i18next";

import Home from "../../../screens/StartPage/Home";
import Explore from "../../../screens/RouteSearch/Explore";
import CreatePoint from "../../../screens/CreatePoint/CreatePoint";
import Profile from "../../../screens/Profile/Profile";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs(props) {
  const { t, i18n } = useTranslation();
  console.log("User: " + props.route.params.user.email);
  return (
    <Tab.Navigator
      initialRouteName="StartPage"
      activeColor="#fefefe"
      inactiveColor="#fefefe"
      barStyle={{ backgroundColor: "white", height: 55 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("homeTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={26} />
          ),
          tabBarColor: "#94E0D6",
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        initialParams={{
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("exploreTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={26} />
          ),
          tabBarColor: "#A2DDD1",
        }}
      />
      <Tab.Screen
        name="Create point"
        component={CreatePoint}
        initialParams={{
          coords: { lat: "", long: "" },
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("createPointTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-plus" color={color} size={26} />
          ),
          tabBarColor: "#ADD7C9",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("profileTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={26} />
          ),
          tabBarColor: "#B9D6C6",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
