import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Star from "@/Assets/Svg/star.svg";
import Heart from "@/Assets/Svg/heart.svg";
import { Text, theme } from "@/Components/Theme";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { useAppSelector } from "@/Store";
import { supabase } from "@/Lib/InitSupabase";
import { IDishResult } from "@/Hooks/useCommon";
interface DishesProps {
  list: IDishResult;
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  is_fav?: boolean;
}

const DishesItem = ({ list, nav, is_fav }: DishesProps) => {
  const [active, setactive] = useState(is_fav ?? false);
  const { user_id } = useAppSelector((state) => state.local);

  useEffect(() => {
    //insert fav dish
    const getFav = async () => {
      if (active) {
        const { error } = await supabase
          .from("consumer_favourite_dishes")
          .insert([{ user_id: user_id, dish_id: list.id }])
          .select();
      } else {
        await supabase
          .from("consumer_favourite_dishes")
          .delete()
          .eq("user_id", user_id)
          .eq("dish_id", list.id);
      }
    };
    getFav();
  }, [active, list.id]);

  return (
    <Pressable
      style={styles.line}
      onPress={() => nav.navigate("Dish", { item: list } as any)}
    >
      <View style={styles.details}>
        <Image source={{ uri: list.image }} style={styles.img} />
        <View style={styles.textdetails}>
          <Text
            textTransform="capitalize"
            color="primary"
            mb="xs"
            variant="title16black_semibold"
          >
            {list.name}
          </Text>
          <Text mb="xxs" color="primary" variant="title12black_medium">
            by
          </Text>
          <View style={styles.rating}>
            <Star />
            <Text color="primary" variant="title12black_medium">
              {" "}
              {list.rating}
            </Text>
          </View>
          <Text color="primary" mt="xs" variant="title12black_medium">
            SAR {list.price}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => setactive(!active)}>
        <Heart
          color={theme.colors.grey700}
          fill={active ? theme.colors.grey700 : theme.colors.white}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderBlockColor: "#d8d8d8",
    paddingVertical: "7%",
  },
  details: { flexDirection: "row", alignItems: "center" },
  img: { height: 81, width: 85, borderRadius: 8, marginRight: "5%" },
  rating: { flexDirection: "row", alignItems: "center" },
  textdetails: {
    justifyContent: "center",
  },
});

export default DishesItem;
