import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { ICuisineResult } from "@/Hooks/useCommon";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";

interface CuisinesProps {
  list: ICuisineResult;
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  is_fav?: boolean;
}

const Item = ({ list, nav, is_fav }: CuisinesProps) => {
  const [active, setactive] = useState(is_fav ?? false);
  const { user_id } = useAppSelector((state) => state.local);

  useEffect(() => {
    //insert fav cuisine
    const getFav = async () => {
      if (active) {
        const { error } = await supabase
          .from("consumer_favourite_cuisine")
          .insert([{ user_id: user_id, cuisine_type: list.type }])
          .select();
      } else {
        await supabase
          .from("consumer_favourite_cuisine")
          .delete()
          .eq("user_id", user_id)
          .eq("cuisine_type", list.type);
      }
    };
    getFav();
  }, [active, list.type]);
  return (
    <View style={styles.item}>
      <ImageBackground
        source={{ uri: list.image }}
        style={styles.img}
        imageStyle={styles.imgbackground}
      >
        <Pressable style={styles.heart} onPress={() => setactive(!active)}>
          <Heart
            color={theme.colors.grey700}
            fill={active ? theme.colors.grey700 : "rgba(52, 52, 52, 0)"}
          />
        </Pressable>
      </ImageBackground>
      <View style={styles.line}>
        <Text
          textTransform="capitalize"
          variant="title16black_bold"
          color="grey800"
        >
          {list.type}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => nav.navigate("Dishes", { list } as any)}
        >
          <Text variant="title12black_semibold" color="white">
            View Dishes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    marginHorizontal: "7%",
    marginBottom: "5%",
    backgroundColor: theme.colors.white,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5%",
  },
  heart: { alignSelf: "flex-end", marginRight: "5%", marginTop: "5%" },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 38,
    paddingVertical: "2%",
    paddingHorizontal: "3%",
  },
  img: { height: 135 },
  imgbackground: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
});

export default Item;
