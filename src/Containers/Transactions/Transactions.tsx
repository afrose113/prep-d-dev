import InfluencerHeader from "@/Components/InfluencerHeader";
import { theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Accordian from "./Accordian";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "@/Lib/InitSupabase";
import { Txn } from "@/@types/txn";

const list = [
  {
    key: 1,
    date: "1-12 Jan 2023",
    start: "SAR 1000",
    end: "SAR 1000",
    desc1: "Earnings",
    desc2: "Payments",
  },
  { key: 2, date: "1-12 Jan 2023" },
];

const data = [{ label: "All Transactions", value: "1" }];
const data2 = [
  { label: "Last 7 Days", value: "1" },
  { label: "Last 1 Month", value: "2" },
  { label: "Last 3 Months", value: "3" },
];

const Transactions = ({ navigation }: HomeNavigationProps<"Transactions">) => {
  const [value, setValue] = useState<string>("1");
  const [value2, setValue2] = useState<string>("1");

  const [txn, settxn] = useState<Txn[] | null>();
  useEffect(() => {
    const getTxn = async () => {
      let { data: influencer_transactions, error } = await supabase
        .from("influencer_transactions")
        .select("*");
      settxn(influencer_transactions);
      console.log({ influencer_transactions });
    };
    getTxn();
  }, []);

  return (
    <View style={styles.container}>
      <InfluencerHeader head="Transactions" navigation={navigation} icon />
      <View style={styles.line}>
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          itemTextStyle={styles.itemTextStyle}
          data={data}
          maxHeight={300}
          minHeight={100}
          fontFamily={"Metropolis-Medium"}
          placeholder="Select Days"
          labelField="label"
          valueField="value"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown2}
          selectedTextStyle={styles.selectedTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          itemTextStyle={styles.itemTextStyle}
          data={data2}
          maxHeight={300}
          minHeight={100}
          fontFamily={"Metropolis-Medium"}
          placeholder="Select Days"
          labelField="label"
          valueField="value"
          value={value2}
          onChange={(item) => {
            setValue2(item.value);
          }}
        />
      </View>
      {txn?.map((item) => {
        return (
          <Accordian
            key={item.id}
            date={item.date}
            desc={item.description}
            start={item.amount}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  dropdown: {
    borderBottomWidth: 1,
    backgroundColor: theme.colors.primary800,
    width: 130,
  },
  dropdown2: {
    borderBottomWidth: 1,
    backgroundColor: theme.colors.primary800,
    width: 100,
    marginLeft: "5%",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginHorizontal: "7%",
    marginTop: "7%",
    marginBottom: "5%",
  },
  selectedTextStyle: {
    fontSize: 12,
    color: theme.colors.grey800,
  },
  itemTextStyle: { fontSize: 10, color: theme.colors.grey800 },
  itemContainerStyle: { backgroundColor: theme.colors.primary800 },
});

export default Transactions;
