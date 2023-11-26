import { Text, theme } from "@/Components/Theme";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Search from "@/Assets/Svg/search.svg";
import Cart from "@/Assets/Svg/cart.svg";
import Back from "@/Assets/Svg/back.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";

interface headprops {
  navigation: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  head: string;
  onSelect: (id: string) => void;
}

const Header = ({ navigation, head, onSelect }: headprops) => {
  return (
    <View style={styles.container}>
      <View style={styles.line2}>
        <View style={styles.line}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Back />
          </TouchableOpacity>
          <Text ms="m" variant="market24Regular" color="white">
            {head}
          </Text>
        </View>
        <TouchableOpacity>
          <Cart />
        </TouchableOpacity>
      </View>
      <View style={styles.searchinput}>
        <Search />
        <TextInput
          style={styles.input}
          onChangeText={(e) => onSelect(e)}
          placeholder="Search for chefs"
          placeholderTextColor={theme.colors.grey400}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  line: { flexDirection: "row", alignItems: "center" },
  line2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchinput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary800,
    height: 38,
    borderRadius: 30,
    paddingHorizontal: "5%",
    marginTop: "5%",
  },
  input: { marginStart: "2%", fontSize: 12, fontFamily: "Metropolis-Medium" },
  back: { height: 15, width: 15, alignSelf: "center" },
});

export default Header;
