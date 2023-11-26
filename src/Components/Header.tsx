import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Drawericon from "@/Assets/Svg/Menu.svg";
import Search from "@/Assets/Svg/search.svg";
import Cart from "@/Assets/Svg/cart.svg";
import { Text, theme } from "@/Components/Theme";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { DrawerActions } from "@react-navigation/native";

interface headprops {
  navigation: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
}

const Header = ({ navigation }: headprops) => {
  return (
    <View style={styles.container}>
      <View style={styles.line2}>
        <View style={styles.line}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image
              source={require("@/Assets/gif/Menu.gif")}
              style={styles.gif}
            />
          </TouchableOpacity>
          <Text ms="m" variant="title12black_medium" color="white">
            Delivering to: House 3, Street 10
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Cart />
        </TouchableOpacity>
      </View>
      <Pressable
        style={styles.searchinput}
        onPress={() => navigation.navigate("Search")}
      >
        <Search />
        <View style={styles.input}>
          <Text variant="title12black_medium" color="grey400">
            Search for chefs, dishes, or cuisines
          </Text>
        </View>
      </Pressable>
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
  gif: { width: 26, height: 26 },
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
});

export default Header;
