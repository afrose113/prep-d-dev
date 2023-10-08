import { theme } from "@/Components/Theme";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

interface paginateProps {
  data: {
    title: string;
    key: number;
    subtitle?: string;
    main_img: HTMLImageElement;
  }[];
  scrollX: Animated.Value;
  index: number;
}
const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX }: paginateProps) => {
  return (
    <View style={styles.container}>
      {data.map((_: any, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX?.interpolate({
          inputRange,
          outputRange: [12, 12, 12],
          extrapolate: "clamp",
        });
        const backgroundColor = scrollX?.interpolate({
          inputRange,
          outputRange: [
            theme.colors.grey300,
            theme.colors.primary,
            theme.colors.grey300,
          ],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});

export default Pagination;
