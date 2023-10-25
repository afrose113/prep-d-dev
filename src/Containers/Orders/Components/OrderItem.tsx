import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Chat from "@/Assets/Svg/chat.svg";
import Heart from "@/Assets/Svg/heart.svg";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps, HomeRoutes } from "@/Navigator/Navigation";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
interface OrderProps {
  list: {
    img: HTMLImageElement;
    order: string;
    chef: string;
    price: string;
    date: string;
  };
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const OrderItem = ({ list, nav }: OrderProps) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.line}>
        <View style={styles.details}>
          <Image source={list.img} style={styles.img} />
          <View style={styles.textdetails}>
            <Text mb="xxs" variant="title16black_semibold">
              {list.order}
            </Text>
            <Text mb="xxs" color="grey600" variant="title12black_medium">
              {list.chef}
            </Text>
            <Text mt="xs" variant="title12black_medium">
              SAR {list.price}
            </Text>
            <Text
              mt="xxs"
              variant="title12black_medium"
              fontSize={10}
              color="grey500"
            >
              {list.date}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => nav.navigate("ReviewOrder")}>
          <Chat />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text variant="title16black_semibold" color="primary800">
          Reorder
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: { flexDirection: "row", alignItems: "center" },
  img: { height: 81, width: 85, borderRadius: 8, marginRight: "5%" },
  rating: { flexDirection: "row", alignItems: "center" },
  textdetails: {
    justifyContent: "center",
  },
  orderItem: {
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderBlockColor: "#d8d8d8",
    paddingVertical: "7%",
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: "5%",
  },
});

export default OrderItem;
