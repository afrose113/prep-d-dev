import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Next from "@/Assets/Svg/Next.svg";

const list = [
  { key: 1, text: "I’m having trouble placing an order" },
  { key: 2, text: "Support Requests" },
  { key: 3, text: "My Account" },
  { key: 4, text: "Payments and Refunds" },
  { key: 5, text: "Discount Codes" },
  { key: 6, text: "Contact Us" },
];

const list2 = [
  { key: 2, text: "Support Requests" },
  { key: 3, text: "My Account" },
  { key: 4, text: "Payments and Transactions" },
  { key: 6, text: "Contact Us" },
];

const HelpCenter = ({ navigation }: HomeNavigationProps<"HelpCenter">) => {
  const influence = false;
  const tabs = influence ? list2 : list;
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Help Center" nav={navigation} />
      {tabs.map((item) => {
        return (
          <TouchableOpacity style={styles.item} key={item.key}>
            <Text variant="title14black_medium">{item.text}</Text>
            <Next />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
  },
});

export default HelpCenter;
