import Header from "@/Components/Header";
import { theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import OrderItem from "./Components/OrderItem";
import { supabase } from "@/Lib/InitSupabase";

const list = [
  {
    key: 1,
    img: require("@/Assets/Images/Dish.png"),
    order: "Order 19328",
    chef: "Monkey Bread + 1 more",
    price: "3.99",
    date: "27 Feb, 19:24",
  },
  {
    key: 2,
    img: require("@/Assets/Images/Dish.png"),
    order: "Order 19328",
    chef: "Monkey Bread + 1 more",
    price: "3.99",
    date: "27 Feb, 19:24",
  },
];

const Orders = ({ navigation }: HomeNavigationProps<"Orders">) => {
  useEffect(() => {
    const getOrders = async () => {
      let { data: orders_hist, error } = await supabase
        .from("cart")
        .select("*")
        .eq("order’_placed", true);
    };
    getOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        renderItem={({ item }) => <OrderItem nav={navigation} list={item} />}
        keyExtractor={(item: any) => item.key}
        data={list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
});

export default Orders;
