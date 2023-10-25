import { Text, theme } from "@/Components/Theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Back from "@/Assets/Svg/back.svg";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import CartItem from "./Components/CartItem";
import TextInput from "@/Components/TextInput";

const list = [
  {
    key: 1,
    img: require("@/Assets/Images/Dish.png"),
    dish: "Smoked Salmon",
    chef: "Khulood Olaqi",
    price: "3.99",
  },
  {
    key: 2,
    img: require("@/Assets/Images/Dish.png"),
    dish: "Smoked Salmon",
    chef: "Khulood Olaqi",
    price: "3.99",
  },
];

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const Head = () => {
    return (
      <View style={styles.time}>
        <Text variant="title12black_medium" color="white">
          Est. Delivery Time
        </Text>
        <Text
          variant="title16black_bold"
          color="white"
          fontSize={20}
          mt="s"
          lineHeight={24}
        >
          45 Min
        </Text>
      </View>
    );
  };
  const Tail = () => {
    return (
      <View>
        <TouchableOpacity>
          <Text variant="title12black_medium" color="orange">
            +{" "}
            <Text
              variant="title12black_medium"
              color="orange"
              textDecorationLine="underline"
            >
              Add More Items
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.line}>
          <View>
            <Text variant="title12black_medium" color="grey500">
              Subtotal
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey500">
              Delivery Charges
            </Text>
          </View>
          <View>
            <Text variant="title12black_medium" color="grey500">
              SAR 31.98
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey500">
              SAR 31.98
            </Text>
          </View>
        </View>
        <TextInput placeholder="Apply a Discount Code" />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Back />
        </TouchableOpacity>
        <Text ms="m" variant="market24Regular" color="white">
          Cart
        </Text>
      </View>
      <FlatList
        ListHeaderComponent={() => <Head />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartItem list={item} />}
        keyExtractor={(item: any) => item.key}
        data={list}
        ListFooterComponent={() => <Tail />}
        ListFooterComponentStyle={styles.foot}
      />
      <View style={[styles.line, { marginHorizontal: "7%" }]}>
        <View style={styles.line2}>
          <Text variant="title16black_semibold" color="grey800">
            Total
          </Text>
          <Text variant="title12black_bold" color="grey400">
            {" "}
            (incl. VAT)
          </Text>
        </View>
        <Text variant="title16black_semibold" color="grey800">
          SAR 33.98
        </Text>
      </View>
      <TouchableOpacity
        style={styles.savebtn}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text variant="title16black_semibold" color="white">
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    paddingTop: "10%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginVertical: "5%",
    marginHorizontal: "7%",
  },
  time: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    marginTop: "10%",
  },
  foot: { marginHorizontal: "5%", marginTop: "5%" },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
  },
  line2: { flexDirection: "row", alignItems: "center" },
  back: { height: 15, width: 15, alignSelf: "center" },
});
export default Cart;
