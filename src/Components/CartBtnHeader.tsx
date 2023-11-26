import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, theme } from "./Theme";
import Back from "@/Assets/Svg/back.svg";
import Cart from "@/Assets/Svg/cart.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { useAppSelector } from "@/Store";

interface HeaderProps {
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  head: string | undefined;
}

const CartBtnHeader = ({ nav, head }: HeaderProps) => {
  const { role } = useAppSelector((state) => state.local);
  return (
    <View style={styles.head}>
      <View style={styles.line}>
        <TouchableOpacity style={styles.back} onPress={() => nav.goBack()}>
          <Back />
        </TouchableOpacity>
        <Text ms="m" variant="market24Regular" color="white">
          {head}
        </Text>
      </View>
      {role != "influencer" && (
        <TouchableOpacity onPress={() => nav.navigate("Cart")}>
          <Cart />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
    overflow: "hidden",
  },
  line: { flexDirection: "row", alignItems: "center" },
  back: { height: 15, width: 15, alignSelf: "center" },
});

export default CartBtnHeader;
