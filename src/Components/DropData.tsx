import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text, theme } from "./Theme";

interface DropdownValueProps {
  placeholder?: string;
  dropDownHeight?: any;
  onSelect: (t: string[]) => void;
  data:
    | {
        value: number | string;
        label: string;
      }[]
    | undefined;
  width?: number;
  height?: number;
  value?: any;
}

const DropData = ({
  placeholder,
  data,
  onSelect,
  width,
  height,
  value,
}: DropdownValueProps) => {
  const [manufacture, setmanufacture] = useState<string[]>([]);
  console.log({ value }, { manufacture });
  return (
    <>
      {data && (
        <Dropdown
          style={[styles.input, { width: width, height: height }]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={[styles.selectedTextStyle]}
          itemTextStyle={[styles.itemStyle]}
          containerStyle={styles.container}
          iconStyle={[styles.iconStyle, { width, height }]}
          data={data as any[]}
          maxHeight={300}
          labelField="label"
          fontFamily="Metropolis-Medium"
          valueField="value"
          placeholder={placeholder}
          activeColor={theme.colors.primary}
          showsVerticalScrollIndicator={false}
          value={value ? value : manufacture}
          onChange={(e) => {
            setmanufacture(e);
            onSelect(e);
          }}
          renderItem={({ label }, active) => {
            return (
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor: active
                      ? theme.colors.primary
                      : theme.colors.primary800,
                  },
                ]}
              >
                <Text
                  variant="title12black_medium"
                  textTransform="capitalize"
                  color={active ? "white" : "black"}
                >
                  {label}
                </Text>
              </View>
            );
          }}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 12,
    color: theme.colors.grey600,
  },
  itemStyle: {
    color: theme.colors.black,
    textTransform: "capitalize",
    fontSize: 12,
  },
  iconStyle: {},
  selectedTextStyle: {
    fontSize: 12,
    textTransform: "capitalize",
  },
  container: {
    borderRadius: 20,
    backgroundColor: theme.colors.primary800,
  },
  input: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    height: 41,
    fontSize: 12,
    borderRadius: 30,
    paddingHorizontal: "5%",
    marginTop: "7%",
  },
  item: { height: 40, justifyContent: "center", paddingHorizontal: "5%" },
});
export default DropData;
