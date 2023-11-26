import { Text, theme } from "@/Components/Theme";
import { supabase } from "@/Lib/InitSupabase";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type Banner = {
  created_at: string;
  id: number;
  image: string;
  user_id: string;
};

const ImageScroll = () => {
  const [banner, setBanner] = useState<Banner[] | null>();
  useEffect(() => {
    const getHome = async () => {
      let { data: banner_image } = await supabase
        .from("banner_image")
        .select("*");
      setBanner(banner_image);
    };
    getHome();
  }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {banner?.map((item) => {
        return (
          <ImageBackground
            source={{ uri: item.image }}
            key={item.id}
            style={styles.img}
            imageStyle={styles.imgR}
          >
            <View style={styles.line}>
              <Image source={require("@/Assets/Images/prepdlogo.png")} />
              <Text variant="title12black_bold" color="primary">
                by
              </Text>
            </View>
            <Text
              color="primary"
              variant="market24Bold"
              fontSize={40}
              lineHeight={44}
            >
              Sarah
            </Text>
            <Text mb="m" variant="title12black_medium" color="primary">
              order now and get 25% {"\n"}off on your first order
            </Text>
            <TouchableOpacity style={styles.btn}>
              <Text variant="title12black_semibold" color="primary">
                Order Now
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 215,
    width: 337,
    marginStart: 20,
    marginTop: "5%",
    padding: "5%",
  },
  imgR: { borderRadius: 8 },
  btn: {
    backgroundColor: theme.colors.primary800,
    height: 34,
    width: 106,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  line: { flexDirection: "row", alignItems: "center" },
});

export default ImageScroll;
