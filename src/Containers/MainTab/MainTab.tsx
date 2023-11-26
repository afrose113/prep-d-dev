import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { theme } from "@/Components/Theme";
import Home from "../Home";
import Orders from "../Orders";
import Favorites from "../Favorites";
import { HomeRoutes } from "@/Navigator/Navigation";
import Homeicon from "@/Assets/Svg/home.svg";
import Ordericon from "@/Assets/Svg/orders.svg";
import Favicon from "@/Assets/Svg/fav.svg";
import Pie from "@/Assets/Svg/pie-chart.svg";
import PieChart from "@/Assets/Svg/piechart_focused.svg";
import HomeInfluencer from "../HomeInfluencer";
import Profileicon from "@/Assets/Svg/influencer_profile.svg";
import Earnings from "../Earnings";
import InfluencerProfile from "../InfluencerProfile";
import { useAppSelector } from "@/Store";

const Tab = createBottomTabNavigator<HomeRoutes>();

const MainTab = () => {
  const { role } = useAppSelector((state) => state.local);
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
      {role === "influencer" ? (
        <Tab.Screen
          name={"HomeInfluencer"}
          component={HomeInfluencer}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/Assets/gif/Home.gif")}
                  style={styles.gif}
                />
              ) : (
                <Homeicon />
              ),
          }}
        />
      ) : (
        <Tab.Screen
          name={"Home"}
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/Assets/gif/Home.gif")}
                  style={styles.gif}
                />
              ) : (
                <Homeicon />
              ),
          }}
        />
      )}
      {role == "influencer" ? (
        <Tab.Screen
          name="Earnings"
          component={Earnings}
          options={{
            tabBarLabel: "Earnings ",
            tabBarIcon: ({ focused }) => (focused ? <PieChart /> : <Pie />),
          }}
        />
      ) : (
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/Assets/gif/Document.gif")}
                  style={styles.gif}
                />
              ) : (
                <Ordericon />
              ),
          }}
        />
      )}
      {role == "influencer" ? (
        <Tab.Screen
          name="InfluencerProfile"
          component={InfluencerProfile}
          options={{
            tabBarLabel: "Profile ",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/Assets/gif/Profile.gif")}
                  style={styles.gif}
                />
              ) : (
                <Profileicon />
              ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/Assets/gif/Favorite.gif")}
                  style={styles.gif}
                />
              ) : (
                <Favicon />
              ),
          }}
        />
      )}
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
  gif: { width: 32, height: 32 },
});
export default MainTab;
