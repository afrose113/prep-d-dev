import CartBtnHeader from "@/Components/CartBtnHeader";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const AddAddress = ({ navigation }: HomeNavigationProps<"AddAddress">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Add Address" nav={navigation} />
      <View style={styles.inputs}>
        <TextInput placeholder="Name (Optional)" />
        <TextInput placeholder="Label (Optional)" />
        <TextInput placeholder="Street" />
        <TextInput placeholder="Floor/Unit #" />
        <TextInput
          placeholder="Note to rider (Optional)"
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.grey500}
          style={styles.input}
        />
        <TouchableOpacity style={styles.savebtn}>
          <Text variant="title16black_semibold" color="white">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  inputs: { marginHorizontal: "7%" },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "15%",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginTop: "7%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
});

export default AddAddress;
