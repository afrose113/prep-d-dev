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
  deserttype?: string;
  chef?: string;
}

const TopItem = ({
  img,
  text,
  onPress,
  ml,
  sub,
  price,
  deserttype,
  chef,
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
      {deserttype != undefined && (
        <Text
          mt="m"
          fontSize={10}
          variant="title12black_semibold"
          color="tertiary"
        >
          {deserttype}
        </Text>
      )}
      <Text
        mt={deserttype ? "xxs" : "m"}
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
  );
};

const styles = StyleSheet.create({
  imgBtn: {},
  img: { height: 143, width: 143 },
  imgB: { borderRadius: 8 },
  heart: { alignSelf: "flex-end", marginTop: "7%", marginEnd: "7%" },
});

export default TopItem;
