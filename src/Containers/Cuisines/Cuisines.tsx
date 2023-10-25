import Filter from "@/Components/Filter";
import { theme } from "@/Components/Theme";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Header from "@/Containers/Chefs/Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import Item from "./Components/Item";

const list = [
  { key: 1, name: "Italian", img: require("@/Assets/Images/cuisine.png") },
  { key: 2, name: "Italian", img: require("@/Assets/Images/cuisine.png") },
];

const Cuisines = ({ navigation }: HomeNavigationProps<"Cuisines">) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Filter />
      <FlatList
        renderItem={({ item }) => <Item list={item} nav={navigation} />}
        keyExtractor={(item: any) => item.key}
        data={list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
});

export default Cuisines;
