import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { theme } from "./Theme";
import { Dimensions, StyleSheet, View } from "react-native";

interface graphProps {
  data: any;
}

const { width } = Dimensions.get("screen");

const Graph = ({ data }: graphProps) => {
  return (
    <View style={styles.chart}>
      <LineChart
        data={data}
        hideDataPoints={true}
        color={theme.colors.tertiary}
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisLength={width * 0.75}
        xAxisColor={theme.colors.grey300}
        yAxisLabelTexts={["SAR 0K", "SAR 10K", "SAR 20K", "SAR 30K"]}
        xAxisLabelTexts={[
          "12 Dec 2022",
          "21 Dec 2022",
          "30 Dec 2022",
          "12 Dec 2022",
        ]}
        spacing={120}
        yAxisTextStyle={styles.text2}
        xAxisLabelTextStyle={styles.text}
        noOfSections={3}
        rulesColor={theme.colors.grey300}
        rulesLength={width * 0.75}
        rulesType="solid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    color: theme.colors.grey800,
    marginLeft: 30,
  },
  text2: {
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    color: theme.colors.grey800,
    width: 70,
  },
  chart: { marginTop: "5%", marginBottom: "10%", marginHorizontal: "12%" },
});

export default Graph;
