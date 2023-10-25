import { Text, theme } from "@/Components/Theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Back from "@/Assets/Svg/back.svg";
import Chat from "@/Assets/Svg/chat 2.svg";
import Bell from "@/Assets/Svg/Notification 2.svg";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";

interface headprops {
  navigation: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const Header = ({ navigation }: headprops) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Back />
        </TouchableOpacity>
        <Text ms="m" variant="market24Regular" color="primary800">
          Explore
        </Text>
      </View>
      <View style={styles.line}>
        <TouchableOpacity>
          <Chat />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bell}>
          <Bell />
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
  back: { height: 15, width: 15, alignSelf: "center" },
});
export default Header;
