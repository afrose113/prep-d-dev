import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Cross from "@/Assets/Svg/close.svg";
import Card from "@/Assets/Svg/card.svg";
import Setting from "@/Assets/Svg/Settings.svg";
import Info from "@/Assets/Svg/Info.svg";
import User from "@/Assets/Svg/User.svg";
import Location from "@/Assets/Svg/Location.svg";
import Help from "@/Assets/Svg/help.svg";
import InfoInfluence from "@/Assets/Svg/Info-in.svg";
import Compass from "@/Assets/Svg/Compas-in.svg";
import SettingsInfluence from "@/Assets/Svg/Settings-in.svg";
import HelpInfluence from "@/Assets/Svg/help-in.svg";

import Logout from "@/Assets/Svg/Logout.svg";
import { Text, theme } from "@/Components/Theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HomeRoutes } from "@/Navigator/Navigation";
import LoginBtn from "./Components/LoginBtn";

const list: (Record<string, any> & { nav?: keyof HomeRoutes })[] = [
  { key: 1, tab: "Profile", icon: <User />, nav: "Profile" },
  { key: 2, tab: "Addresses", icon: <Location />, nav: "Addresses" },
  { key: 3, tab: "Payment Method", icon: <Card />, nav: "Payment" },
  { key: 4, tab: "Help Center", icon: <Help />, nav: "HelpCenter" },
  { key: 5, tab: "Settings", icon: <Setting />, nav: "Settings" },
  { key: 6, tab: "About", icon: <Info />, nav: "About" },
];
const list2: (Record<string, any> & { nav?: keyof HomeRoutes })[] = [
  { key: 1, tab: "Explore", icon: <Compass />, nav: "Explore" },
  { key: 2, tab: "Help Center", icon: <HelpInfluence />, nav: "HelpCenter" },
  { key: 3, tab: "Settings", icon: <SettingsInfluence />, nav: "Settings" },
  { key: 4, tab: "About", icon: <InfoInfluence />, nav: "About" },
];

const DrawerContent = () => {
  const nav =
    useNavigation<DrawerNavigationProp<HomeRoutes, "DrawerNavigator">>();
  const influence = false;
  const tabs = influence ? list2 : list;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cross}
        onPress={() => nav.dispatch(DrawerActions.closeDrawer())}
      >
        <Cross />
      </TouchableOpacity>
      {tabs.map((item: any) => {
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.line}
            onPress={() => nav.navigate(item.nav)}
          >
            {item.icon}
            <Text ms="s" color="grey800" variant="title12black_medium">
              {item.tab}
            </Text>
          </TouchableOpacity>
        );
      })}
      {influence && (
        <>
          <View style={styles.line2} />
          <TouchableOpacity style={styles.customer}>
            <Text
              variant="title12black_medium"
              textDecorationLine="underline"
              color="orange"
            >
              Switch to Customer View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.influencer}>
            <Text
              variant="title12black_medium"
              textDecorationLine="underline"
              color="orange"
            >
              Access Web Portal
            </Text>
          </TouchableOpacity>
          <View style={styles.line2} />
        </>
      )}
      <LoginBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  line: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "5%",
    paddingHorizontal: "7%",
  },
  cross: { alignSelf: "flex-end", marginEnd: "7%", marginTop: "10%" },
  greyline: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginHorizontal: "7%",
    marginVertical: "2%",
  },
  influencer: {
    marginHorizontal: "7%",
    marginTop: "7%",
    marginBottom: "8%",
  },
  customer: {
    marginTop: "10%",
    marginHorizontal: "7%",
  },
  line2: {
    backgroundColor: "#d8d8d8",
    width: "85%",
    height: 1,
    alignSelf: "center",
  },
});

export default DrawerContent;
