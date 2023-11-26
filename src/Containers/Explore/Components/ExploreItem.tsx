import { Text, theme } from "@/Components/Theme";
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
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Fire from "@/Assets/Svg/fire.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { Item } from "@/@types/item";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import Star from "@/Assets/Svg/star.svg";
import Share from "@/Assets/Svg/share.svg";
import { supabase } from "@/Lib/InitSupabase";

interface itemProps {
  ml?: number;
  item: Item;
  active2?: number;
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  homeFlag?: boolean;
  length?: number;
  index?: number;
}

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;

type Dish = {
  approval_admin: boolean;
  approval_cloud: boolean;
  category: string;
  created_at: string;
  cuisine_type: string;
  description: string;
  dish_type: null;
  id: string;
  image: string;
  ingredients: [];
  is_draft: boolean;
  method: null;
  name: string;
  pdf: null;
  preparation_link: null;
  price: string | null;
  total_orders: number;
  user_id: string;
  rating: number;
};

const ExploreItem = ({
  ml,
  item,
  active2,
  nav,
  homeFlag,
  index,
  length,
}: itemProps) => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const [dish, setdish] = useState<Dish | null>();
  useEffect(() => {
    const getDish = async () => {
      let { data: dish, error } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("id", item.dish_id);
      setdish(dish && dish[0]);
    };
    getDish();
  }, []);
  console.log({ length }, index);
  return (
    <>
      <Pressable
        style={[
          styles.imgBtn,
          { marginLeft: ml },
          index === length - 1 && styles.leftAlignedItem,
        ]}
        onPress={() =>
          active2 == 1
            ? nav.navigate("ChefProfile", { item } as any)
            : active2 == 2
            ? refRBSheet.current.open()
            : homeFlag && nav.navigate("DishDescription", { item } as any)
        }
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.img}
          imageStyle={styles.imgB}
        >
          {active2 == 2 && item.total_orders != undefined && (
            <View style={styles.list2}>
              <Fire />
              <Text ms="s" variant="title12black_medium" color="grey800">
                {item.total_orders} Order{item.total_orders > 1 && "s"}
              </Text>
            </View>
          )}
        </ImageBackground>
        {dish?.category != undefined && (
          <Text
            mt="s"
            variant="title12black_semibold"
            fontSize={10}
            textTransform="uppercase"
            color="tertiary"
          >
            {dish?.category}
          </Text>
        )}
        <Text
          textTransform="capitalize"
          variant="title14black_semibold"
          color="primary"
          mt="xs"
        >
          {item.name}
        </Text>
        {item?.price != undefined && (
          <Text
            variant="title12black_regular"
            mb={item.influencer_name != undefined ? "xxs" : "m"}
            color="grey800"
          >
            SAR {item?.price}
          </Text>
        )}
        {item.influencer_name != undefined && (
          <Text variant="title12black_medium" color="primary" mb="s">
            by {item.influencer_name}
          </Text>
        )}
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
          container: styles.container,
        }}
      >
        <View>
          <View style={styles.line3}>
            <Text variant="title16black_bold" fontSize={20} color="primary">
              {dish?.name}
            </Text>
            <Share />
          </View>
          <Text mt="xs" variant="title12black_medium" color="primary">
            {item.influencer_name} | {dish?.cuisine_type} Cuisine
          </Text>
          <View style={[styles.line, { marginBottom: "3%", marginTop: "2%" }]}>
            <Star />
            <Text variant="title12black_medium" ms="xxs" color="primary">
              {dish?.rating}
            </Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.img2} />
          <Text mt="m" variant="title12black_medium" color="grey800">
            {dish?.description}
          </Text>
          <Text variant="title12black_semibold" color="primary" mt="s">
            from SAR {dish?.price}
          </Text>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  imgBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
  img: { height: 159, width: 159 },
  imgB: { borderRadius: 8 },
  heart: { alignSelf: "flex-end", marginTop: "7%", marginEnd: "7%" },
  list2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(245, 243, 233, 0.5)",
    width: 94,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "1.5%",
  },
  container: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
  line: { flexDirection: "row", alignItems: "center" },
  line3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img2: { height: 158, marginTop: "2%" },
  leftAlignedItem: {
    alignItems: "flex-start",
    marginStart: "4%",
  },
});

export default ExploreItem;
