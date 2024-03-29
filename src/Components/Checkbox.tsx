import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from "react-native-bouncy-checkbox";
import { theme } from "./Theme";

interface CheckboxProps extends IBouncyCheckboxProps {
  text: string;
  size: number;
  fontSize: number;
  mt?: boolean;
}

const Checkbox = ({ text, size, fontSize, mt, ...props }: CheckboxProps) => {
  return (
    <BouncyCheckbox
      size={size}
      fillColor={theme.colors.primary}
      unfillColor={theme.colors.primary800}
      text={text}
      iconStyle={styles.iconbox}
      innerIconStyle={styles.innericon}
      textStyle={[styles.checktext, { fontSize: fontSize }]}
      style={[styles.checkbox, { marginTop: mt ? 0 : "5%" }]}
      onPress={(isChecked: boolean) => {}}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  iconbox: { borderColor: theme.colors.primary, borderRadius: 4 },
  innericon: {
    borderWidth: 1,
    borderRadius: 4,
  },
  checktext: {
    fontFamily: "Metropolis-Medium",
    color: theme.colors.grey800,
    textDecorationLine: "none",
  },
  checkbox: {},
});

export default Checkbox;
