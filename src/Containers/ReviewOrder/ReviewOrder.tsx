import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ReviewOrder = ({ navigation }: HomeNavigationProps<"ReviewOrder">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Review Order" nav={navigation} />
      <View style={styles.page}>
        <View style={styles.line}>
          <Text variant="title16black_semibold" color="primary">
            Order 24762
          </Text>
          <Text variant="title12black_medium" fontSize={10} color="grey500">
            27 Feb, 19:24
          </Text>
        </View>
        <Text mt="s" variant="title12black_medium" color="primary">
          Total: SAR 33.98
        </Text>
        <Text mt="s" variant="title12black_medium" color="grey500">
          Delivered by: Rashid
        </Text>
        <Text variant="title16black_semibold" mt="l" color="primary">
          How would you rate your overall experience?
        </Text>
        <AirbnbRating
          count={5}
          size={24}
          selectedColor={theme.colors.primary}
          showRating={false}
          starContainerStyle={{
            borderColor: theme.colors.grey400,
            backgroundColor: theme.colors.primary800,
          }}
        />
        <Text variant="title16black_semibold" mt="l" color="primary">
          How would you rate the following?
        </Text>
        <TextInput
          placeholder="Write something (Optional)"
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.grey500}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn}>
          <Text variant="title16black_semibold" color="primary800">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginTop: "5%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
  page: { marginHorizontal: "7%", marginTop: "9%" },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: "7%",
  },
});

export default ReviewOrder;
