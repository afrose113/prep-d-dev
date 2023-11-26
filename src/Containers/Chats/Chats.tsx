import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const list = [
  {
    key: 1,
    noti: "Someone gave a 5 star rating to your dish.",
    img: require("@/Assets/Images/bread.png"),
    count: 4,
    name: "Razor Clams Pasta",
  },
  {
    key: 2,
    noti: "Your recipe has been reviewed and approved.",
    img: require("@/Assets/Images/Dish.png"),
    count: 4,
    name: "Razor Clams Pasta",
  },
  {
    key: 3,
    noti: "Your recipe has been reviewed and approved.",
    img: require("@/Assets/Images/dish2.png"),
    count: 4,
    name: "Razor Clams Pasta",
  },
];

const Chats = ({ navigation }: HomeNavigationProps<"Chats">) => {
  return (
    <View style={styles.container}>
      <InfluencerHeader head="Chat" navigation={navigation} icon />
      <ScrollView>
        {list.map((item) => {
          return (
            <View key={item.key} style={styles.list}>
              <View style={styles.list2}>
                <Image source={item.img} style={styles.circle} />
                <View>
                  <Text variant="title16black_medium" color="grey800">
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    mt="xs"
                    ellipsizeMode="tail"
                    style={styles.text}
                    variant="title12black_medium"
                    color="grey500"
                  >
                    {item.noti}
                  </Text>
                </View>
              </View>
              <View style={styles.count}>
                <Text variant="title16black_medium" color="white">
                  {item.count}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.grey200,
    paddingVertical: "5%",
    alignItems: "center",
  },
  text: { width: 200 },
  list2: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: "5%",
  },
  count: {
    backgroundColor: theme.colors.orange,
    width: 27,
    height: 27,
    borderRadius: 13.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chats;
