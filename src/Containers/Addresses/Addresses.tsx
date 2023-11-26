import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Home from "@/Assets/Svg/Homeaddress.svg";
import Location from "@/Assets/Svg/LocationAddress.svg";
import Office from "@/Assets/Svg/Case.svg";
import Edit from "@/Assets/Svg/edit.svg";
import { supabase } from "@/Lib/InitSupabase";
import { AddressItem } from "@/@types/address";
import { useIsFocused } from "@react-navigation/native";

const Addresses = ({ navigation }: HomeNavigationProps<"Addresses">) => {
  const [address, setaddress] = useState<AddressItem[] | null>();
  const focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      const getAddress = async () => {
        let { data: address, error } = await supabase
          .from("consumer_address")
          .select("*");
        setaddress(address);
      };
      getAddress();
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head="Addresses" />
      {address?.map((item) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={item.id}
            onPress={() => navigation.navigate("AddAddress", { item } as any)}
          >
            <View style={styles.line}>
              {item.label == "Home" ? (
                <Home />
              ) : item.label == "Office" ? (
                <Office />
              ) : (
                <Location color={theme.colors.orange} />
              )}
              <View style={styles.address}>
                <Text variant="title16black_semibold" color="primary">
                  {item.name}
                </Text>
                <Text variant="title12black_medium" color="grey600">
                  {item.floor_unit}
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
