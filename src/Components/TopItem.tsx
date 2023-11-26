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
import Heart from "@/Assets/Svg/heart.svg";
import Fire from "@/Assets/Svg/fire.svg";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import Star from "@/Assets/Svg/star.svg";
import Share from "@/Assets/Svg/share.svg";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";

interface itemProps {
  img: string | undefined;
  text: string | undefined;
  onPress?: () => void;
  ml?: number;
  me?: number;
  sub?: string;
  price?: number;
  deserttype?: string;
  chef?: string;
  heart?: boolean;
  orders?: number;
  desc?: string;
  cuisine?: string;
  rating?: string;
  is_fav?: boolean;
  index?: number;
  chef_id?: string;
  dish_id?: string;
  cuisine_type?: string;
}

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;

const TopItem = ({
  img,
  text,
  onPress,
  ml,
  me,
  sub,
  price,
  deserttype,
  chef,
  heart,
  orders,
  desc,
  cuisine,
  rating,
  is_fav,
  index,
  chef_id,
  cuisine_type,
  dish_id,
}: itemProps) => {
  const [active, setactive] = useState(is_fav ?? false);
  const { user_id } = useAppSelector((state) => state.local);

  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  useEffect(() => {
    //insert fav chef
    const getFav = async () => {
      if (active) {
        await supabase
          .from("consumer_favourite_influencer")
          .insert([{ user_id: user_id, influencer_id: chef_id }])
          .select();
      } else {
        await supabase
          .from("consumer_favourite_influencer")
          .delete()
          .eq("user_id", user_id)
          .eq("influencer_id", chef_id);
      }
    };
    getFav();
  }, [active, chef_id]);
  useEffect(() => {
    //insert fav dish
    const getFav = async () => {
      if (active) {
        const { error } = await supabase
          .from("consumer_favourite_dishes")
          .insert([{ user_id: user_id, dish_id: dish_id }])
          .select();
      } else {
        await supabase
          .from("consumer_favourite_dishes")
          .delete()
          .eq("user_id", user_id)
          .eq("dish_id", dish_id);
      }
    };
    getFav();
  }, [active, dish_id]);
  useEffect(() => {
    //insert fav cuisine
    const getFav = async () => {
      if (active) {
        const { error } = await supabase
          .from("consumer_favourite_cuisine")
          .insert([{ user_id: user_id, cuisine_type: cuisine_type }])
          .select();
      } else {
        await supabase
          .from("consumer_favourite_cuisine")
          .delete()
          .eq("user_id", user_id)
          .eq("cuisine_type", cuisine_type);
      }
    };
    getFav();
  }, [active, cuisine_type]);
  return (
    <>
      <Pressable
        style={[
          styles.imgBtn,
          { marginLeft: index == 0 ? 20 : ml, marginEnd: me },
        ]}
        {...{ onPress }}
      >
        <ImageBackground
          source={{ uri: img }}
          style={styles.img}
          imageStyle={styles.imgB}
        >
          {orders != undefined && (
            <View style={styles.list2}>
              <Fire />
              <Text ms="s" variant="title12black_medium" color="grey800">
                {orders} Order{orders && orders > 1 && "s"}
              </Text>
            </View>
          )}
          {!heart && (
            <Pressable style={styles.heart} onPress={() => setactive(!active)}>
              <Heart
                color={active ? theme.colors.tertiary : theme.colors.grey400}
                height={16}
                width={18}
                fill={active ? theme.colors.tertiary : "rgba(52, 52, 52, 0)"}
              />
            </Pressable>
          )}
        </ImageBackground>
        {deserttype != undefined && (
          <Text
            mt="xs"
            fontSize={10}
            variant="title12black_semibold"
            color="tertiary"
          >
            {deserttype}
          </Text>
        )}
        <Text
          mt={deserttype ? "xxs" : "m"}
          textTransform="capitalize"
          variant="title14black_semibold"
          color="primary"
        >
          {text}
        </Text>
        {price != undefined && (
          <Text variant="title12black_medium" color="primary">
            SAR {price}
          </Text>
        )}
        {chef != undefined && (
          <Text variant="title12black_medium" color="primary">
            by {chef}
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
              {text}
            </Text>
            <Share />
          </View>
          <Text mt="xs" variant="title12black_medium" color="primary">
            {chef} | {cuisine} Cuisine
          </Text>
          <View style={[styles.line, { marginBottom: "3%", marginTop: "2%" }]}>
            <Star />
            <Text variant="title12black_medium" ms="xxs" color="primary">
              {rating}
            </Text>
          </View>
          <Image source={{ uri: img }} style={styles.img2} />
          <Text mt="m" variant="title12black_medium" color="grey800">
            {desc}
          </Text>
          <Text variant="title12black_semibold" color="primary" mt="s">
            from SAR {price}
          </Text>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  imgBtn: {},
  img2: { height: 158, marginTop: "2%" },
  img: { height: 143, width: 143 },
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
});

export default TopItem;
