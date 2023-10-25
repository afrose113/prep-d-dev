import { Text, theme } from "@/Components/Theme";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import Filter from "@/Components/Filter";
import ChefsItem from "./Components/ChefsItem";

const list = [
  {
    key: 1,
    text: "Amr Kaki",
    img: require("@/Assets/Images/chef.png"),
  },
  {
    key: 2,
    text: "Raneen Joudah",
    img: require("@/Assets/Images/chef2.png"),
  },
  {
    key: 3,
    text: "Khulood Olaqi",
    img: require("@/Assets/Images/Chef3.png"),
  },
];

const Chefs = ({ navigation }: HomeNavigationProps<"Chefs">) => {
  const [active, setactive] = useState<number>();
  const HeaderComp = () => <Filter onSelect={(e) => setactive(e)} />;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={list}
        key={"_"}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={<HeaderComp />}
        ListHeaderComponentStyle={styles.list}
        renderItem={({ item }) => <ChefsItem text={item.text} img={item.img} />}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  list: { marginBottom: "2%" },
  column: {
    marginBottom: "7%",
    justifyContent: "space-between",
    marginHorizontal: "7%",
  },
});

export default Chefs;
