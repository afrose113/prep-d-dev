import { Text, theme } from "@/Components/Theme";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface DishesProps {
  list: {
    img: HTMLImageElement;
    dish: string;
    chef: string;
    price: string;
  };
}

const CartItem = ({ list }: DishesProps) => {
  const [value, setValue] = useState(0);
  const increaseValue = () => {
    setValue(value + 1);
  };
  const decreaseValue = () => {
    if (value != 0) setValue(value - 1);
  };
  return (
    <View style={styles.line}>
      <View style={styles.details}>
        <Image source={list.img} style={styles.img} />
        <View style={styles.textdetails}>
          <Text mb="xs" color="primary" variant="title16black_semibold">
            {list.dish}
          </Text>
          <Text mb="xxs" color="primary" variant="title12black_medium">
            by {list.chef}
          </Text>
          <Text mt="m" color="primary" variant="title12black_medium">
            SAR {list.price}
          </Text>
        </View>
      </View>
      <View style={styles.plusminus}>
        <TouchableOpacity onPress={() => decreaseValue()}>
          <Text
            variant="title16black_medium"
            lineHeight={26}
            fontSize={22}
            color="primary800"
          >
            -
          </Text>
        </TouchableOpacity>
        <Text
          marginHorizontal="m"
          variant="title16black_medium"
          color="primary800"
        >
          {value}
        </Text>
        <TouchableOpacity onPress={() => increaseValue()}>
          <Text
            variant="title16black_medium"
            fontSize={22}
            lineHeight={26}
            color="primary800"
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  textdetails: {
    justifyContent: "center",
  },
  plusminus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.orange,
    borderRadius: 20,
    height: 32,
    paddingHorizontal: "5%",
    alignSelf: "flex-end",
  },
});
export default CartItem;
