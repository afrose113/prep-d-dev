import Header from "@/Components/Header";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

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
    text: "Amr Kaki",
    img: require("@/Assets/Images/chef.png"),
  },
];
const list2 = [
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
const list3 = [
  {
    key: 1,
    text: "Monkey Bread",
    img: require("@/Assets/Images/dish2.png"),
  },
  {
    key: 2,
    text: "Smoked Salmon",
    img: require("@/Assets/Images/Dish.png"),
  },
  {
    key: 3,
    text: "Amr Kaki",
    img: require("@/Assets/Images/bread.png"),
  },
];
const Favorites = ({ navigation }: HomeNavigationProps<"Favorites">) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Chefs
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Chefs")}>
            <Text
              textDecorationLine="underline"
              variant="title12black_medium"
              color="orange"
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.text}
                key={item.key}
                img={item.img}
                onPress={() => navigation.navigate("ChefProfile")}
              />
            );
          })}
        </ScrollView>
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Dishes
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Dishes")}>
            <Text
              textDecorationLine="underline"
              variant="title12black_medium"
              color="orange"
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list2.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.text}
                key={item.key}
                img={item.img}
                chef={item.chef}
                deserttype={item.type}
                onPress={() => navigation.navigate("Dish")}
              />
            );
          })}
        </ScrollView>
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Cuisines
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Dishes")}>
            <Text
              textDecorationLine="underline"
              variant="title12black_medium"
              color="orange"
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scroll}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {list3.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.text}
                key={item.key}
                img={item.img}
                onPress={() => navigation.navigate("Dish")}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.primary800, flex: 1 },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "3%",
    marginTop: "10%",
  },
  scroll: { marginBottom: "30%" },
});

export default Favorites;
