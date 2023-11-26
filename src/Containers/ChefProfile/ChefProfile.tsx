import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import Share from "@/Assets/Svg/share.svg";
import Insta from "@/Assets/Svg/instagram.svg";
import Snap from "@/Assets/Svg/snapchat.svg";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import CartBtnHeader from "@/Components/CartBtnHeader";
import { Item } from "@/@types/item";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";

type Chef_dishes = {
  approval_admin: boolean;
  approval_cloud: boolean;
  cuisine_type: string;
  description: string;
  dish_type: null;
  id: string;
  image: string;
  ingredients: [];
  is_draft: boolean;
  method: string;
  name: string;
  pdf: string;
  preparation_link: string;
  price: number;
  rating: string;
  total_orders: number;
  user_id: string;
};

const ChefProfile = ({
  navigation,
  route,
}: HomeNavigationProps<"ChefProfile">) => {
  const params: any = route.params;
  const profile: Item = params?.item;
  const [chef_dishes, setchef_dishes] = useState<Chef_dishes[] | null>();
  useEffect(() => {
    const getChef = async () => {
      let { data: user_profiles, error } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("user_id", profile.user_id)
        .eq("approval_cloud", true)
        .eq("is_draft", false);
      setchef_dishes(user_profiles);
    };
    getChef();
  }, []);
  const chef_special = chef_dishes?.filter((item) => item.total_orders > 99);
  const other_dishes = chef_dishes?.filter((item) => item.total_orders < 99);
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Chef Profile" nav={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.line2}>
            <View style={styles.line}>
              <Image source={{ uri: profile?.image }} style={styles.img} />
              <View>
                <Text mb="xs" variant="title16black_semibold" color="primary">
                  {profile?.full_name ?? profile?.name}
                </Text>
                <Text mb="s" variant="title12black_medium" color="tertiary">
                  Chef
                </Text>
                <View style={styles.line}>
                  <TouchableOpacity style={styles.btn}>
                    <Insta />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Snap />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Heart color={theme.colors.grey700} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.share}>
              <Share color={theme.colors.grey700} />
            </TouchableOpacity>
          </View>
        </View>
        {chef_special && chef_special?.length > 0 && (
          <Text mb="m" ms="l" variant="title16black_bold" color="primary">
            Chef Specials
          </Text>
        )}
        <ScrollView
          style={styles.special}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {chef_special?.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.name}
                key={item.id}
                img={item.image}
                price={item.price}
                desc={item.description}
                cuisine={item.cuisine_type}
                rating={item.rating}
              />
            );
          })}
        </ScrollView>
        <Text mb="m" ms="l" variant="title16black_bold" color="primary">
          Other Dishes
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {other_dishes?.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.name}
                key={item.id}
                img={item.image}
                price={item.price}
                desc={item.description}
                cuisine={item.cuisine_type}
                rating={item.rating}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  btn: { marginRight: 10 },
  special: { marginBottom: "10%" },
  line: { flexDirection: "row", alignItems: "center" },
  line2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  share: { marginStart: 10 },
  card: {
    backgroundColor: theme.colors.card,
    padding: "5%",
    margin: "7%",
    borderRadius: 10,
  },
  img: { height: 72, width: 72, borderRadius: 36, marginRight: "5%" },
});

export default ChefProfile;
