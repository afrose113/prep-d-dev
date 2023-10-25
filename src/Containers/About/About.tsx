import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps, HomeRoutes } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Next from "@/Assets/Svg/Next.svg";

const list: (Record<string, any> & { nav?: keyof HomeRoutes })[] = [
  { key: 1, text: "Terms & Conditions", nav: "TermsnConditions" },
  { key: 2, text: "Data Policy", nav: "DataPolicy" },
];

const About = ({ navigation }: HomeNavigationProps<"About">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="About" nav={navigation} />
      {list.map((item) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={item.key}
            onPress={() => item.nav && navigation.navigate(item.nav)}
          >
            <Text variant="title14black_medium">{item.text}</Text>
            <Next />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
  },
});

export default About;
