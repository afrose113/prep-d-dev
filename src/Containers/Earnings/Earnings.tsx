import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Transactions from "./Components/TransactionsBox";
import Bank from "./Components/Bank";
import Graph from "@/Components/Graph";

const data = [
  { value: 50 },
  { value: 80 },
  { value: 90 },
  { value: 70 },
  { value: 50 },
  { value: 80 },
  { value: 90 },
  { value: 70 },
];

const Earnings = ({ navigation }: HomeNavigationProps<"Earnings">) => {
  return (
    <View style={styles.container}>
      <InfluencerHeader
        head="Hello Akash!"
        navigation={navigation}
        icon={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text mt="xl" ms="l" variant="title14black_semibold" color="grey800">
          Total Earnings
        </Text>
        <Text
          mt="s"
          ms="l"
          variant="title16black_bold"
          fontSize={20}
          lineHeight={24}
          color="primary"
        >
          SAR 2000
        </Text>
        <Graph data={data} />
        <Transactions nav={navigation} />
        <Bank />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
});

export default Earnings;
