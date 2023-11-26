import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Back from "@/Assets/Svg/back.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { Text, theme } from "./Theme";
import { DrawerActions } from "@react-navigation/native";

interface headprops {
  navigation: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  icon: boolean;
  head: string;
  name?: string;
}

const InfluencerHeader = ({ navigation, icon, head, name }: headprops) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        {!icon ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image
              source={require("@/Assets/gif/Menu.gif")}
              style={styles.gif}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Back />
          </TouchableOpacity>
        )}
        <Text
          ms="m"
          fontSize={!icon ? 20 : 24}
          lineHeight={!icon ? 24 : 28}
          variant={!icon ? "title16black_semibold" : "market24Regular"}
          color="primary800"
        >
          {head} {name && name + "!"}
        </Text>
      </View>
      <View style={styles.line}>
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Image source={require("@/Assets/gif/chat.gif")} style={styles.gif} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bell}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            source={require("@/Assets/gif/Notification.gif")}
            style={styles.gif}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bell: { marginStart: 10 },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: { alignSelf: "center", width: 15, height: 15 },
  gif: { width: 26, height: 26 },
});

export default InfluencerHeader;
