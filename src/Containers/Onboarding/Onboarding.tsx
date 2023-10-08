import { Text, theme } from "@/Components/Theme";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SlideItem from "./Components/SlideItem";
import Pagination from "./Components/Pagination";
import { AuthNavigationProps } from "@/Navigator/Navigation";

const list = [
  {
    title: "All your Favorite Influencers",
    subtitle:
      "Browse the menu and order your favorite dishes with easy on-demand delivery",
    key: 1,
    main_img: require("@/Assets/Images/onboard_1.png"),
  },
  {
    title: "Unmatched Reliability",
    key: 2,
    subtitle: "Experience peace of mind while tracking your order in real time",
    main_img: require("@/Assets/Images/onboard_2.png"),
  },
  {
    title: "24/7 Support",
    key: 3,
    subtitle: "Something came up? Talk to us, we are here to help!",
    main_img: require("@/Assets/Images/onboard_3.png"),
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleOnScroll = (event: any) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={list} scrollX={scrollX} index={index} />
      <TouchableOpacity style={styles.btn}>
        <Text textAlign="center" variant="title12black_semibold">
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  btn: { marginVertical: "5%" },
});
export default Onboarding;
