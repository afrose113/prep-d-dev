import CartBtnHeader from "@/Components/CartBtnHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { StyleSheet, View } from "react-native";

const TermsnConditions = ({
  navigation,
}: HomeNavigationProps<"TermsnConditions">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Terms & Conditions" nav={navigation} />
      <Text
        variant="title12black_medium"
        marginHorizontal="l"
        mt="xl"
        color="grey800"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, vivamus
        duis laoreet amet. Aliquet elementum ultrices molestie netus donec
        pellentesque quis.
      </Text>
      <Text
        variant="title12black_medium"
        marginHorizontal="l"
        mt="l"
        color="grey800"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, vivamus
        duis laoreet amet. Aliquet elementum ultrices molestie netus donec
        pellentesque quis.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
});

export default TermsnConditions;
