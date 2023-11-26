import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Cross from "@/Assets/Svg/close.svg";
import { Text, theme } from "@/Components/Theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HomeRoutes } from "@/Navigator/Navigation";
import LoginBtn from "./Components/LoginBtn";
import { useAppSelector } from "@/Store";
import { removeAccessToken } from "@/Store/slices/local";
import { useDispatch } from "react-redux";

const list: (Record<string, any> & { nav?: keyof HomeRoutes })[] = [
  {
    key: 1,
    tab: "Profile",
    icon: require("@/Assets/gif/Profile.gif"),
    nav: "Profile",
  },
  {
    key: 2,
    tab: "Addresses",
    icon: require("@/Assets/gif/Address.gif"),
    nav: "Addresses",
  },
  {
    key: 3,
    tab: "Payment Method",
    icon: require("@/Assets/gif/Payment.gif"),
    nav: "Payment",
  },
  {
    key: 4,
    tab: "Help Center",
    icon: require("@/Assets/gif/HelpCenter.gif"),
    nav: "HelpCenter",
  },
  {
    key: 5,
    tab: "Settings",
    icon: require("@/Assets/gif/Settings.gif"),
    nav: "Settings",
  },
  {
    key: 6,
    tab: "About",
    icon: require("@/Assets/gif/About.gif"),
    nav: "About",
  },
];
const list2: (Record<string, any> & { nav?: keyof HomeRoutes })[] = [
  {
    key: 1,
    tab: "Explore",
    icon: require("@/Assets/gif/Profile.gif"),
    nav: "Explore",
  },
  {
    key: 2,
    tab: "Help Center",
    icon: require("@/Assets/gif/HelpCenter.gif"),
    nav: "HelpCenter",
  },
  {
    key: 3,
    tab: "Settings",
    icon: require("@/Assets/gif/Settings.gif"),
    nav: "Settings",
  },
  {
    key: 4,
    tab: "About",
    icon: require("@/Assets/gif/About.gif"),
    nav: "About",
  },
];

const DrawerContent = () => {
  const nav =
    useNavigation<DrawerNavigationProp<HomeRoutes, "DrawerNavigator">>();
  const { role, access_token } = useAppSelector((state) => state.local);
  const dispatch = useDispatch();
  const tabs = role == "influencer" ? list2 : list;
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
            <Image source={item.icon} style={styles.gif} />
            <Text ms="s" color="grey800" variant="title12black_medium">
              {item.tab}
            </Text>
          </TouchableOpacity>
        );
      })}
      {role == "influencer" && (
        <>
          <View style={styles.line2} />
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
      {access_token ? (
        <TouchableOpacity
          style={styles.line}
          onPress={() => dispatch(removeAccessToken())}
        >
          <Image
            source={require("@/Assets/gif/Logout.gif")}
            style={styles.gif}
          />
          <Text ms="s" color="grey800" variant="title12black_medium">
            Logout
          </Text>
        </TouchableOpacity>
      ) : (
        <LoginBtn />
      )}
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
  gif: { width: 34, height: 34 },
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
  line2: {
    backgroundColor: "#d8d8d8",
    width: "85%",
    height: 1,
    alignSelf: "center",
  },
});

export default DrawerContent;
