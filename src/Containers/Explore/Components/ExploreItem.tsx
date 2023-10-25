import { Text, theme } from "@/Components/Theme";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import Heart from "@/Assets/Svg/heart.svg";

interface itemProps {
  img: HTMLImageElement;
  text: string;
  onPress?: () => void;
  ml?: number;
  sub?: string;
  price?: string;
  meal_type?: string;
}

const ExploreItem = ({
  img,
  text,
  onPress,
  ml,
  sub,
  price,
  meal_type,
}: itemProps) => {
  const [active, setactive] = useState(false);
  return (
    <Pressable style={[styles.imgBtn, { marginLeft: ml }]} {...{ onPress }}>
      <ImageBackground source={img} style={styles.img} imageStyle={styles.imgB}>
        <Pressable style={styles.heart} onPress={() => setactive(!active)}>
          <Heart
            color={active ? theme.colors.tertiary : theme.colors.grey400}
            height={16}
            width={18}
            fill={active ? theme.colors.tertiary : "rgba(52, 52, 52, 0)"}
          />
        </Pressable>
      </ImageBackground>
      {meal_type != undefined && (
        <Text
          mt="s"
          variant="title12black_semibold"
          fontSize={10}
          color="tertiary"
        >
          {meal_type}
        </Text>
      )}
      <Text
        mt={meal_type != undefined ? "xxs" : "m"}
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
      {sub != undefined && (
        <Text variant="title12black_medium" color="primary">
          by {sub}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imgBtn: { width: "45%" },
  img: { height: 159, width: 159 },
  imgB: { borderRadius: 8 },
  heart: { alignSelf: "flex-end", marginTop: "7%", marginEnd: "7%" },
});

export default ExploreItem;
