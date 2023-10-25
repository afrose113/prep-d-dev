import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SwitchBtn from "./Components/SwitchBtn";

const list = [
  { key: 1, text: "Language" },
  { key: 2, text: "Receive Push Notifications" },
  { key: 3, text: "Receive Offers by Email" },
];

const Settings = ({ navigation }: HomeNavigationProps<"Settings">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Settings" nav={navigation} />
      {list.map((item) => {
        return (
          <View style={styles.item} key={item.key}>
            <Text variant="title14black_medium">{item.text}</Text>
            {item.key != 1 ? (
              <SwitchBtn />
            ) : (
              <Text
                variant="title12black_medium"
                color="grey500"
                textDecorationLine="underline"
              >
                Arabic
              </Text>
            )}
          </View>
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

export default Settings;
