import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Star from "@/Assets/Svg/star.svg";
import Heart from "@/Assets/Svg/heart.svg";
import { Text, theme } from "@/Components/Theme";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
interface DishesProps {
  list: {
    img: HTMLImageElement;
    dish: string;
    chef: string;
    price: string;
    rating: string;
  };
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const DishesItem = ({ list, nav }: DishesProps) => {
  const [active, setactive] = useState(false);
  return (
    <Pressable style={styles.line} onPress={() => nav.navigate("Dish")}>
      <View style={styles.details}>
        <Image source={list.img} style={styles.img} />
        <View style={styles.textdetails}>
          <Text color="primary" mb="xs" variant="title16black_semibold">
            {list.dish}
          </Text>
          <Text mb="xxs" color="primary" variant="title12black_medium">
            by {list.chef}
          </Text>
          <View style={styles.rating}>
            <Star />
            <Text color="primary" variant="title12black_medium">
              {" "}
              {list.rating}
            </Text>
          </View>
          <Text color="primary" mt="xs" variant="title12black_medium">
            SAR {list.price}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => setactive(!active)}>
        <Heart
          color={theme.colors.grey700}
          fill={active ? theme.colors.grey700 : theme.colors.white}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderBlockColor: "#d8d8d8",
    paddingVertical: "7%",
  },
  details: { flexDirection: "row", alignItems: "center" },
  img: { height: 81, width: 85, borderRadius: 8, marginRight: "5%" },
  rating: { flexDirection: "row", alignItems: "center" },
  textdetails: {
    justifyContent: "center",
  },
});

export default DishesItem;
