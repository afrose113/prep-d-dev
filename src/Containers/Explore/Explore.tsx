import { theme } from "@/Components/Theme";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExploreItem from "./Components/ExploreItem";
import Filter from "@/Components/Filter";
import Header from "./Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";

interface Item {
  key: number;
  text: string;
  img: HTMLImageElement;
  chef?: string; // Optional for list2
  type?: string; // Optional for list2
}

const list: Item[] = [
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
const list2: Item[] = [
  {
    key: 1,
    text: "Monkey Bread",
    img: require("@/Assets/Images/bread.png"),
    chef: "Raneen Joudah",
    type: "DESSERT",
  },
  {
    key: 2,
    text: "Smoked Salmon",
    img: require("@/Assets/Images/Dish.png"),
    chef: "Khulood Olaqi",
    type: "DESSERT",
  },
  {
    key: 3,
    text: "Burger",
    img: require("@/Assets/Images/dish2.png"),
    chef: "Khulood Olaqi",
    type: "BREAKFAST",
  },
];
const Explore = ({ navigation }: HomeNavigationProps<"Explore">) => {
  const [value, setvalue] = useState<number>();
  const HeaderComp = () => <Filter onSelect={(e) => setvalue(e)} />;
  const dataToDisplay: Item[] =
    value === 1 || value == undefined ? list : list2;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={dataToDisplay}
        key={"_"}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={<HeaderComp />}
        ListHeaderComponentStyle={styles.list}
        renderItem={({ item }) => (
          <ExploreItem
            text={item.text}
            img={item.img}
            sub={item.chef}
            meal_type={item.type}
          />
        )}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.primary800, flex: 1 },
  list: { marginBottom: "2%" },
  column: {
    marginBottom: "7%",
    justifyContent: "space-between",
    marginHorizontal: "7%",
  },
});

export default Explore;
