import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "@/Components/Theme";
import Home from "../Home";
import Orders from "../Orders";
import Favorites from "../Favorites";
import { HomeRoutes } from "@/Navigator/Navigation";
import Homeicon from "@/Assets/Svg/home.svg";
import HomeiconFocused from "@/Assets/Svg/home_active.svg";
import Ordericon from "@/Assets/Svg/orders.svg";
import OrdericonFocused from "@/Assets/Svg/order_active.svg";
import Favicon from "@/Assets/Svg/fav.svg";
import FaviconFocused from "@/Assets/Svg/heart_active.svg";

const Tab = createBottomTabNavigator<HomeRoutes>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontFamily: "Metropolis-Medium", fontSize: 12 },
        tabBarInactiveTintColor: theme.colors.grey400,
        tabBarStyle: [styles.card, styles.shadowProp],
        tabBarActiveTintColor: theme.colors.orange,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeiconFocused /> : <Homeicon />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <OrdericonFocused /> : <Ordericon />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <FaviconFocused /> : <Favicon />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.primary800,
    borderTopWidth: 0,
    height: 88,
    paddingBottom: 15,
    paddingTop: 7,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: "absolute",
    overflow: "hidden",
  },
  shadowProp: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
  },
});
export default MainTab;
