import Graph from "@/Components/Graph";
import { Text, theme } from "@/Components/Theme";
import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";

interface ItemProps {
  list: {
    item: string;
    res: number | undefined | string;
    key: number;
    data?: { value: number }[];
  };
}

const data = [
  { label: "Last 7 Days", value: "1" },
  { label: "Last 1 Month", value: "2" },
  { label: "Last 3 Months", value: "3" },
];

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;

const ItemGrid = ({ list }: ItemProps) => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const [value, setValue] = useState<string>("1");

  return (
    <>
      <Pressable style={styles.list} onPress={() => refRBSheet.current.open()}>
        <Text variant="title12black_medium" color="white">
          {list.item}
        </Text>
        <Text
          variant="title16black_semibold"
          fontSize={20}
          lineHeight={24}
          color="white"
        >
          {list.res}
        </Text>
      </Pressable>
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
          container: styles.container2,
        }}
      >
        <View>
          <View style={styles.line}>
            <Text variant="title16black_bold" color="primary">
              {list.key == 1
                ? "Total Orders"
                : list.key == 2
                ? "Ratings Received"
                : list.key == 3
                ? "Profile Visits"
                : "Total Earnings"}
            </Text>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              itemTextStyle={styles.itemTextStyle}
              data={data}
              maxHeight={300}
              minHeight={100}
              fontFamily={"Metropolis-Medium"}
              placeholder="Select Days"
              labelField="label"
              valueField="value"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <Text ms="l" mt="s" variant="title12black_medium" color="grey800">
            {list.key == 1
              ? "12 more than the usual 5-8"
              : list.key == 2
              ? "12 more than the usual 10-15"
              : list.key == 3
              ? "2 more than the usual 0-1"
              : "You earned SAR 12k which is 5k more than usual"}
          </Text>
          {list.key == 1 ? (
            <Graph data={list.data} />
          ) : list.key == 2 ? (
            <></>
          ) : list.key == 3 ? (
            <Graph data={list.data} />
          ) : (
            <Graph data={list.data} />
          )}
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.orange,
    borderRadius: 54,
    height: 60,
    justifyContent: "center",
    width: 163,
    paddingHorizontal: "7%",
    marginHorizontal: "2%",
    marginBottom: "2%",
  },
  container2: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingVertical: "3%",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "6%",
  },
  dropdown: {
    borderBottomWidth: 1,
    backgroundColor: theme.colors.primary800,
    width: 100,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: theme.colors.grey800,
  },
  itemTextStyle: { fontSize: 10, color: theme.colors.grey800 },
  itemContainerStyle: { backgroundColor: theme.colors.primary800 },
});

export default ItemGrid;
