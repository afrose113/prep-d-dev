import { Text, theme } from "@/Components/Theme";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";

interface CuisinesProps {
  list: {
    img: HTMLImageElement;
    name: string;
  };
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const Item = ({ list, nav }: CuisinesProps) => {
  const [active, setactive] = useState(false);
  return (
    <View style={styles.item}>
      <ImageBackground
        source={list.img}
        style={styles.img}
        imageStyle={styles.imgbackground}
      >
        <Pressable style={styles.heart} onPress={() => setactive(!active)}>
          <Heart
            color={theme.colors.grey700}
            fill={active ? theme.colors.grey700 : "rgba(52, 52, 52, 0)"}
          />
        </Pressable>
      </ImageBackground>
      <View style={styles.line}>
        <Text variant="title16black_bold" color="grey800">
          {list.name}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => nav.navigate("Dishes")}
        >
          <Text variant="title12black_semibold" color="white">
            View Dishes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    marginHorizontal: "7%",
    marginBottom: "5%",
    backgroundColor: theme.colors.white,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5%",
  },
  heart: { alignSelf: "flex-end", marginRight: "5%", marginTop: "5%" },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 38,
    paddingVertical: "2%",
    paddingHorizontal: "3%",
  },
  img: { height: 135 },
  imgbackground: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
});

export default Item;
