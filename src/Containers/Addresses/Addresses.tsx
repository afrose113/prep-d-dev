import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Home from "@/Assets/Svg/Homeaddress.svg";
import Location from "@/Assets/Svg/LocationAddress.svg";
import Office from "@/Assets/Svg/Case.svg";
import Edit from "@/Assets/Svg/edit.svg";

const list = [
  { key: 1, text: "Home", icon: <Home />, loc: "House 3, Street 10" },
  { key: 2, text: "Work", icon: <Office />, loc: "Floor 32, Saudi Towers" },
  {
    key: 3,
    text: "Apartment 993, Floor 6 ",
    icon: <Location color={theme.colors.orange} />,
  },
];

const Addresses = ({ navigation }: HomeNavigationProps<"Addresses">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head="Addresses" />
      {list.map((item) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={item.key}
            onPress={() => navigation.navigate("AddAddress")}
          >
            <View style={styles.line}>
              <>{item.icon}</>
              <View style={styles.address}>
                <Text variant="title16black_semibold" color="primary">
                  {item.text}
                </Text>
                <Text variant="title12black_medium" color="grey600">
                  {item.loc}
                </Text>
              </View>
            </View>
            <Edit />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.savebtn}
        onPress={() => navigation.navigate("AddAddress")}
      >
        <Text variant="title16black_semibold" color="white">
          Add Address
        </Text>
      </TouchableOpacity>
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
  address: { marginStart: 10 },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "15%",
    marginHorizontal: "7%",
  },
  line: { flexDirection: "row", alignItems: "center" },
});

export default Addresses;
