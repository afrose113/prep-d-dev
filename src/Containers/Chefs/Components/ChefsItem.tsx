import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeRoutes } from "@/Navigator/Navigation";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";

interface itemProps {
  img: string;
  text: string;
  onPress?: () => void;
  ml?: number;
  sub?: string;
  price?: string;
  nav: BottomTabNavigationProp<HomeRoutes, keyof HomeRoutes>;
  is_fav?: boolean;
  id: string;
  index: number;
  length: number | undefined;
}
let width = Dimensions.get("screen").width / 2 - 28;

const ChefsItem = ({
  img,
  text,
  onPress,
  ml,
  price,
  is_fav,
  id,
  index,
  length,
}: itemProps) => {
  const [active, setactive] = useState(is_fav ?? false);
  const { user_id } = useAppSelector((state) => state.local);
  useEffect(() => {
    const getFav = async () => {
      if (active) {
        const { error } = await supabase
          .from("consumer_favourite_influencer")
          .insert([{ user_id: user_id, influencer_id: id }])
          .select();
        console.log({ error }, id);
      } else {
        await supabase
          .from("consumer_favourite_influencer")
          .delete()
          .eq("user_id", user_id)
          .eq("influencer_id", id);
      }
    };
    getFav();
  }, [active, id]);

  return (
    <>
      <Pressable
        style={[
          styles.imgBtn,
          index === length - 1 && styles.leftAlignedItem,
          ,
          { marginLeft: ml },
        ]}
        {...{ onPress }}
      >
        <ImageBackground
          source={{ uri: img }}
          style={styles.img}
          imageStyle={styles.imgB}
        >
          <Pressable style={styles.heart} onPress={() => setactive(!active)}>
            <Heart
              color={active ? theme.colors.tertiary : theme.colors.grey400}
              height={16}
              width={18}
              fill={active ? theme.colors.tertiary : "rgba(52, 52, 52, 0)"}
            />
          </Pressable>
        </ImageBackground>
        <Text
          marginVertical="m"
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
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  imgBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: { height: width, width: width },
  imgB: { borderRadius: 8 },
  heart: { alignSelf: "flex-end", marginTop: "7%", marginEnd: "7%" },
  leftAlignedItem: {
    alignItems: "flex-start",
    marginStart: "4%",
  },
});

export default ChefsItem;
