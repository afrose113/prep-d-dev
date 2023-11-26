import { Txn } from "@/@types/txn";
import { Text, theme } from "@/Components/Theme";
import { supabase } from "@/Lib/InitSupabase";
import { HomeRoutes } from "@/Navigator/Navigation";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface TxnProps {
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const TransactionsBox = ({ nav }: TxnProps) => {
  const [txn, settxn] = useState<Txn[] | null>();
  useEffect(() => {
    const getExplore = async () => {
      let { data: influencer_transactions, error } = await supabase
        .from("influencer_transactions")
        .select("*");
      settxn(influencer_transactions);
    };
    getExplore();
  }, []);

  return (
    <View style={styles.container}>
      <Text mb="m" variant="title14black_semibold" color="grey800">
        Transactions
      </Text>
      {txn?.map((item) => {
        return (
          <View style={styles.list} key={item.id}>
            <Text variant="title12black_medium" color="grey800">
              {item.date}
            </Text>
            <Text variant="title12black_medium" color="grey800">
              SAR {item.amount}
            </Text>
          </View>
        );
      })}
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.savebtn}
        onPress={() => nav.navigate("Transactions")}
      >
        <Text variant="title16black_semibold" color="white">
          View Transactions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    marginHorizontal: "6%",
    paddingHorizontal: "3%",
    borderRadius: 20,
    paddingVertical: "3%",
    marginTop: "5%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "5%",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1%",
  },
  line: {
    height: 2,
    width: "100%",
    backgroundColor: theme.colors.grey200,
    marginVertical: "3%",
  },
  btn: {},
});

export default TransactionsBox;
