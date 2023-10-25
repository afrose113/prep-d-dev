import { Text, theme } from "@/Components/Theme";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Back from "@/Assets/Svg/back.svg";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import Location from "@/Assets/Svg/LocationAddress.svg";
import Edit from "@/Assets/Svg/edit.svg";
import Wallet from "@/Assets/Svg/Wallet.svg";
import Card from "@/Assets/Svg/Mastercard.svg";
import Doc from "@/Assets/Svg/Document.svg";
import TextInput from "@/Components/TextInput";

const Checkout = ({ navigation }: HomeNavigationProps<"Checkout">) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Back />
        </TouchableOpacity>
        <Text ms="m" variant="market24Regular" color="white">
          Cart
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.border}>
        <View style={styles.line}>
          <View style={styles.line2}>
            <Location color={theme.colors.primary} />
            <Text ms="m" variant="title16black_semibold" color="primary">
              Delivery Location
            </Text>
          </View>
          <Edit />
        </View>
        <Text mt="m" variant="title12black_medium" color="grey500">
          House 3, Street 10
        </Text>
        <TextInput
          placeholder="Note to rider (Optional)"
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.grey500}
          style={styles.input}
        />
        <View style={styles.horiLine} />
        <View style={styles.line}>
          <View style={styles.line2}>
            <Wallet />
            <Text ms="m" variant="title16black_semibold" color="primary">
              Payment Method
            </Text>
          </View>
          <Edit />
        </View>
        <View style={[styles.line, { marginTop: "5%" }]}>
          <View style={styles.line2}>
            <Card />
            <Text ms="m" variant="title12black_medium" color="grey500">
              8293 8281 7364 9192
            </Text>
          </View>
          <Text variant="title12black_medium" color="grey500">
            SAR 33.98
          </Text>
        </View>
        <View style={styles.horiLine} />
        <View style={styles.line}>
          <View style={styles.line2}>
            <Doc />
            <Text ms="m" variant="title16black_semibold" color="primary">
              Order Summary
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              variant="title12black_medium"
              color="orange"
              fontSize={10}
              textDecorationLine="underline"
            >
              Go to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.line, { marginTop: "5%" }]}>
          <View>
            <Text variant="title12black_medium" color="grey500">
              1 x Burger
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey500">
              1 x Burger
            </Text>
          </View>
          <View>
            <Text variant="title12black_medium" color="grey500">
              SAR 31.98
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey500">
              SAR 31.98
            </Text>
          </View>
        </View>
        <View style={styles.horiLine} />
        <View style={[styles.line, { marginTop: "5%" }]}>
          <View>
            <Text variant="title12black_medium" color="grey600">
              Subtotal
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey600">
              Delivery Charges
            </Text>
          </View>
          <View>
            <Text variant="title12black_medium" color="grey600">
              SAR 31.98
            </Text>
            <Text mt="s" variant="title12black_medium" color="grey600">
              SAR 31.98
            </Text>
          </View>
        </View>
        <TextInput placeholder="Apply a Discount Code" />
      </ScrollView>
      <View style={[styles.line, { marginHorizontal: "7%" }]}>
        <View style={styles.line2}>
          <Text variant="title16black_semibold" color="grey800">
            Total
          </Text>
          <Text variant="title12black_bold" color="grey400">
            {" "}
            (incl. VAT)
          </Text>
        </View>
        <Text variant="title16black_semibold" color="grey800">
          SAR 33.98
        </Text>
      </View>
      <TouchableOpacity
        style={styles.savebtn}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text variant="title16black_semibold" color="white">
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginVertical: "5%",
    marginHorizontal: "7%",
  },
  back: { height: 15, width: 15, alignSelf: "center" },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    paddingTop: "10%",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line2: { flexDirection: "row", alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginTop: "3%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
  border: { padding: "7%" },
  horiLine: {
    height: 2,
    width: "100%",
    backgroundColor: theme.colors.grey200,
    marginVertical: "5%",
  },
});

export default Checkout;
