import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Up from "@/Assets/Svg/up.svg";
import Down from "@/Assets/Svg/down.svg";
import Print from "@/Assets/Svg/print.svg";
import Download from "@/Assets/Svg/download.svg";
import { Text, theme } from "@/Components/Theme";

interface accProps {
  date: string;
  desc: string | undefined;
  start: number | undefined;
  end?: string | undefined;
}

const Accordian = ({ date, desc, start, end }: accProps) => {
  const [expanded, setExpanded] = useState(false);
  const body = (
    <View style={styles.accordBody}>
      <View style={styles.line2}>
        <Download />
        <Print style={styles.down} />
      </View>
      <View style={styles.line3}>
        <Text variant="title12black_medium" fontSize={10} color="grey800">
          Starting Balance: {start}
        </Text>
        <Text variant="title12black_medium" fontSize={10} color="grey800">
          Ending Balance: {end}
        </Text>
      </View>
      <View style={styles.line3}>
        <View>
          <Text variant="title12black_medium" fontSize={10} color="grey400">
            Date
          </Text>
          <Text variant="title12black_medium" fontSize={10} color="grey800">
            {date}
          </Text>
        </View>
        <View>
          <Text variant="title12black_medium" fontSize={10} color="grey400">
            Description
          </Text>
          <Text variant="title12black_medium" fontSize={10} color="grey800">
            {desc}
          </Text>
        </View>
        <View>
          <Text
            textAlign="right"
            variant="title12black_medium"
            fontSize={10}
            color="grey400"
          >
            Amount
          </Text>
          <Text variant="title12black_medium" fontSize={10} color="grey800">
            {start}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <Pressable style={styles.line} onPress={() => setExpanded(!expanded)}>
        <Text variant="title14black_medium" color="white">
          {date}
        </Text>
        {expanded ? <Up /> : <Down />}
      </Pressable>
      {expanded && body}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    backgroundColor: theme.colors.orange,
    marginHorizontal: "7%",
    borderTopLeftRadius: 4,
    borderTopEndRadius: 4,
    height: 36,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    marginTop: "3%",
  },
  line2: { flexDirection: "row", alignItems: "center" },
  line3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
    marginTop: "3%",
  },
  accordBody: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    marginHorizontal: "7%",
    paddingHorizontal: "3%",
    paddingBottom: "2%",
    paddingTop: "5%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  down: { marginStart: "5%" },
});

export default Accordian;
