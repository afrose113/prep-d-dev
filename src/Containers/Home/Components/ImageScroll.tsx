import { Text, theme } from "@/Components/Theme";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const list = [
  { key: 1, img: require("@/Assets/Images/home.png") },
  { key: 2, img: require("@/Assets/Images/home.png") },
];

const ImageScroll = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item) => {
        return (
          <ImageBackground
            source={item.img}
            key={item.key}
            style={styles.img}
            imageStyle={styles.imgR}
          >
            <View style={styles.line}>
              <Image source={require("@/Assets/Images/prepdlogo.png")} />
              <Text variant="title12black_bold" color="primary">
                by
              </Text>
            </View>
            <Text
              color="primary"
              variant="market24Bold"
              fontSize={40}
              lineHeight={44}
            >
              Sarah
            </Text>
            <Text mb="m" variant="title12black_medium" color="primary">
              order now and get 25% {"\n"}off on your first order
            </Text>
            <TouchableOpacity style={styles.btn}>
              <Text variant="title12black_semibold" color="primary">
                Order Now
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 215,
    width: 337,
    marginStart: 20,
    marginTop: "5%",
    padding: "3%",
  },
  imgR: { borderRadius: 8 },
  btn: {
    backgroundColor: theme.colors.primary800,
    height: 34,
    width: 106,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  line: { flexDirection: "row", alignItems: "center" },
});

export default ImageScroll;
