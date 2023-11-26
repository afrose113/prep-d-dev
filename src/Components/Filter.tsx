import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, theme } from "./Theme";
import Filtericon from "@/Assets/Svg/Filter.svg";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import Checkbox from "./Checkbox";
import { useAppSelector } from "@/Store";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.3 * height;

const list = [
  {
    key: 1,
    text: "All",
  },
  {
    key: 2,
    text: "My Favorites",
  },
];

const filter = [
  { key: 1, item: "Name" },
  { key: 2, item: "Date Added" },
];

const Filter = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const [active, setactive] = useState<any>(1);
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxToggle = (key: number) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const handleClearFilters = () => {
    setCheckboxStates({});
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.filterdrop}
        onPress={() => refRBSheet.current.open()}
      >
        <Filtericon />
        <Text ms="s" variant="title14black_medium">
          Filter
        </Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={SLIDE_HEIGHT2}
        customStyles={{
          draggableIcon: {
            width: 0,
            height: 0,
          },
          container: styles.container,
        }}
      >
        <View>
          <View style={[styles.line, { marginBottom: "2%" }]}>
            <Text variant="market24Regular" fontSize={20} lineHeight={24}>
              Filter by
            </Text>
            <TouchableOpacity onPress={handleClearFilters}>
              <Text variant="title12black_medium" color="orange">
                +{" "}
                <Text
                  variant="title12black_medium"
                  color="orange"
                  fontSize={10}
                  textDecorationLine="underline"
                >
                  Clear Filters
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          {filter.map((item) => {
            return (
              <Checkbox
                text={item.item}
                size={17}
                key={item.key}
                fontSize={16}
                isChecked={checkboxStates[item.key] || false}
                onPress={() => handleCheckboxToggle(item.key)}
              />
            );
          })}
          <TouchableOpacity style={styles.btn}>
            <Text variant="title16black_semibold" color="primary800">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: "7%",
  },
  filterdrop: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 30,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Filter;
