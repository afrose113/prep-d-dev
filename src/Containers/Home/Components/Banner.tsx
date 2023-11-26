import { Text, theme } from "@/Components/Theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const list = [
  {
    key: 1,
    head: "Get Free\nDelivery!",
    sub: "Enjoy free delivery on your first order",
    code: "Freed",
  },
  {
    key: 2,
    head: "Get Free\nDelivery!",
    sub: "Enjoy free delivery on your first order",
    code: "Freed",
  },
];

const Banner = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item, index: number) => {
        return (
          <View
            key={item.key}
            style={[styles.banner, { marginLeft: index == 0 ? 20 : 0 }]}
          >
            <View style={styles.line}>
              <Text
                variant="title32black_bold"
                fontSize={28}
                color="primary800"
                lineHeight={32}
              >
                {item.head}
              </Text>
              <Text variant="title12black_medium" color="primary800">
                Code:{item.code}
              </Text>
            </View>
            <Text mt="s" variant="title12black_medium" color="primary800">
              {item.sub}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: 337,
    padding: 20,
    marginTop: "5%",
    marginEnd: 20,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Banner;
