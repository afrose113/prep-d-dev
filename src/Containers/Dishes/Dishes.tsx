import { theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import Filter from "@/Components/Filter";
import DishesItem from "./Components/DishesItem";

const list = [
  {
    key: 1,
    img: require("@/Assets/Images/Dish.png"),
    dish: "Smoked Salmon",
    chef: "Khulood Olaqi",
    price: "3.99",
    rating: "4",
  },
  {
    key: 2,
    img: require("@/Assets/Images/dish2.png"),
    dish: "Burger",
    chef: "Khulood Olaqi",
    price: "3.99",
    rating: "4",
  },
];

const Dishes = ({ navigation }: HomeNavigationProps<"Dishes">) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Filter />
      <FlatList
        renderItem={({ item }) => <DishesItem list={item} nav={navigation} />}
        keyExtractor={(item: any) => item.key}
        data={list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
});

export default Dishes;
