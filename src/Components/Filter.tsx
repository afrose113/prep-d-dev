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

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.3 * height;

interface filterProps {
  onSelect: (e: number) => void;
}

const list2 = [
  {
    key: 1,
    text: "All",
  },
  {
    key: 2,
    text: "My Favorites",
  },
];

const list3 = [
  {
    key: 1,
    text: "Trending Influencers",
  },
  {
    key: 2,
    text: "Trending Dishes",
  },
];

const list = [
  { key: 1, item: "Name" },
  { key: 2, item: "Date Added" },
];

const Filter = ({ onSelect }: filterProps) => {
  const [active, setactive] = useState<number>(1);
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const influence = false;
  const tabs = influence ? list3 : list2;

  return (
    <View style={[styles.line, { paddingHorizontal: "7%" }]}>
      <ScrollView
        horizontal
        style={styles.filter}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((item) => {
          return (
            <Pressable
              style={[
                styles.filterBtn,
                {
                  backgroundColor:
                    active == item.key
                      ? theme.colors.orange
                      : theme.colors.primary800,
                  borderWidth: active == item.key ? 0 : 1,
                  borderColor: active != item.key ? "#D8D8D8" : "#FFFFFF",
                },
              ]}
              key={item.key}
              onPress={() => {
                setactive(item.key);
                onSelect(item.key);
              }}
            >
              <Text
                color={active == item.key ? "white" : "grey800"}
                variant="title14black_medium"
              >
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
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
            <TouchableOpacity>
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
          {list.map((item) => {
            return (
              <Checkbox
                text={item.item}
                size={17}
                key={item.key}
                fontSize={16}
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
  filter: {
    marginVertical: "5%",
  },
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
  filterBtn: {
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterdrop: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: "3%",
    height: 30,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Filter;
