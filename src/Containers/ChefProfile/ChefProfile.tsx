import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import Share from "@/Assets/Svg/share.svg";
import Insta from "@/Assets/Svg/instagram.svg";
import Snap from "@/Assets/Svg/snapchat.svg";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import CartBtnHeader from "@/Components/CartBtnHeader";

const list3 = [
  {
    key: 1,
    text: "Burger",
    img: require("@/Assets/Images/dish2.png"),
    price: "3.99",
  },
  {
    key: 2,
    text: "Smoked Salmon",
    img: require("@/Assets/Images/gnnochi.png"),
    price: "3.99",
  },
  {
    key: 3,
    text: "Monkey Bread",
    img: require("@/Assets/Images/bread.png"),
    price: "3.99",
  },
];
const list = [
  {
    key: 1,
    text: "Tacos",
    img: require("@/Assets/Images/tacos.png"),
  },
  {
    key: 2,
    text: "Smoked Salmon",
    img: require("@/Assets/Images/dish2.png"),
  },
  {
    key: 3,
    text: "Burger",
    img: require("@/Assets/Images/bread.png"),
  },
];

const ChefProfile = ({ navigation }: HomeNavigationProps<"ChefProfile">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Chef Profile" nav={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.line2}>
            <View style={styles.line}>
              <Image
                source={require("@/Assets/Images/chef.png")}
                style={styles.img}
              />
              <View>
                <Text mb="xs" variant="title16black_semibold" color="primary">
                  Raneen Joudah
                </Text>
                <Text mb="s" variant="title12black_medium" color="tertiary">
                  Chef
                </Text>
                <View style={styles.line}>
                  <TouchableOpacity style={styles.btn}>
                    <Insta />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Snap />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Heart color={theme.colors.grey700} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.share}>
              <Share color={theme.colors.grey700} />
            </TouchableOpacity>
          </View>
        </View>
        <Text mb="m" ms="l" variant="title16black_bold" color="primary">
          Chef Specials
        </Text>
        <ScrollView
          style={styles.special}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {list3.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.text}
                key={item.key}
                img={item.img}
                price={item.price}
              />
            );
          })}
        </ScrollView>
        <Text mb="m" ms="l" variant="title16black_bold" color="primary">
          Other Dishes
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => {
            return (
              <TopItem ml={20} text={item.text} key={item.key} img={item.img} />
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  btn: { marginRight: 10 },
  special: { marginBottom: "10%" },
  line: { flexDirection: "row", alignItems: "center" },
  line2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  share: { marginStart: 10 },
  card: {
    backgroundColor: theme.colors.card,
    padding: "5%",
    margin: "7%",
    borderRadius: 10,
  },
  img: { height: 72, width: 72, borderRadius: 36, marginRight: "5%" },
});

export default ChefProfile;
