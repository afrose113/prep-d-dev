import { Text, theme } from "@/Components/Theme";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface SlideProps {
  item: {
    title: string;
    key: number;
    subtitle?: string;
    main_img: HTMLImageElement;
  };
  onPress: () => void;
}

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item, onPress }: SlideProps) => {
  return (
    <View style={styles.container}>
      <Image source={item.main_img} style={styles.main} />
      <Text mt="xl" textAlign="center" variant="market40Medium" color="primary">
        {item.title}
      </Text>
      <Text
        marginHorizontal="l"
        textAlign="center"
        variant="title16black_medium"
        color="grey800"
        mt="m"
      >
        {item.subtitle}
      </Text>
      {item.key == 3 && (
        <TouchableOpacity style={styles.btn} {...{ onPress }}>
          <Text variant="title16black_semibold" color="primary800">
            Get Started
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { width, height, alignItems: "center" },
  main: {
    width: "90%",
    resizeMode: "contain",
    flex: 0.6,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "90%",
    marginTop: "10%",
  },
});

export default SlideItem;
