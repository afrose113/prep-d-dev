import Checkbox from "@/Components/Checkbox";
import { Text, theme } from "@/Components/Theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const list = [
  { key: 1, item: "Maple Syrup", price: "+SAR 0.40" },
  { key: 2, item: "Whipped Cream", price: "+SAR 0.40" },
  { key: 3, item: "Oreo Dip", price: "+SAR 0.40" },
  { key: 4, item: "Caramel Syrup", price: "+SAR 0.40" },
];

const Additem = () => {
  return (
    <>
      {list.map((item) => {
        return (
          <View key={item.key} style={styles.container}>
            <Checkbox size={15} text={item.item} fontSize={12} mt />
            <Text variant="title12black_medium" color="grey800">
              {item.price}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3%",
    marginHorizontal: "7%",
  },
});

export default Additem;
