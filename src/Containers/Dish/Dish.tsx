import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Heart from "@/Assets/Svg/heart.svg";
import Share from "@/Assets/Svg/share.svg";
import Star from "@/Assets/Svg/star.svg";
import Additem from "./Components/Additem";
import CartBtnHeader from "@/Components/CartBtnHeader";
import { Item } from "@/@types/item";
import { supabase } from "@/Lib/InitSupabase";

type dishDetails = {
  approval_admin: boolean;
  approval_cloud: boolean;
  category: string;
  created_at: string;
  cuisine_type: string;
  description: string;
  id: string;
  image: string;
  influencer_name: string;
  ingredients: [];
  is_draft: boolean;
  method: string;
  name: string;
  pdf: string;
  preparation_link: null;
  price: number;
  rating: number;
  total_orders: number;
  updated_at: string;
  user_id: string;
};

const Dish = ({ navigation, route }: HomeNavigationProps<"Dish">) => {
  const params: any = route.params;
  const item: Item = params?.item;
  const [dish, setdish] = useState<dishDetails>();
  const [value, setValue] = useState(0);
  const increaseValue = () => {
    setValue(value + 1);
  };
  const decreaseValue = () => {
    if (value != 0) setValue(value - 1);
  };
  useEffect(() => {
    const getDish = async () => {
      let { data: dish_details, error } = await supabase
        .from("influencer_dishes")
        .select("*")
        // Filters
        .eq("id", item.dish_id ?? item.id);
      setdish(dish_details && dish_details[0]);
    };
    getDish();
  }, []);
  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head={dish?.name} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: dish?.image }} style={styles.dish} />
        <View style={styles.line2}>
          <View>
            <Text variant="title12black_medium" color="primary">
              Prep’d by {dish?.influencer_name} {"\n"}
              {dish?.cuisine_type} Cuisine
            </Text>
          </View>
          <View style={styles.line}>
            <TouchableOpacity>
              <Heart color={theme.colors.grey700} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.share}>
              <Share color={theme.colors.grey700} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.line, { marginStart: "7%", marginTop: "3%" }]}>
          <Star />
          <Text ms="xs" variant="title12black_medium" color="primary">
            {dish?.rating}
          </Text>
        </View>
        <Text mt="s" ms="l" variant="title12black_semibold" color="primary">
          from SAR {dish?.price}
        </Text>
        <Text
          variant="title12black_regular"
          color="grey800"
          marginHorizontal="l"
          textTransform="capitalize"
          mt="m"
        >
          {dish?.description}
        </Text>
        <Text
          variant="title16black_semibold"
          mb="m"
          color="primary"
          ms="l"
          mt="l"
        >
          Add Ons
        </Text>
        <Additem />
        <Text variant="title16black_semibold" color="primary" ms="l" mt="l">
          Special Instructions
        </Text>
        <Text
          variant="title12black_regular"
          color="grey800"
          marginHorizontal="l"
          mt="s"
        >
          Please let us know if you are allergic to anything or if we need to
          avoid anything
        </Text>
        <TextInput
          placeholder="e.g. no nuts"
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.grey500}
          style={styles.input}
        />
      </ScrollView>
      <View style={[styles.line2, { marginVertical: "5%" }]}>
        <View style={styles.plusminus}>
          <TouchableOpacity onPress={() => decreaseValue()}>
            <Text
              variant="title12black_regular"
              lineHeight={34}
              fontSize={30}
              color="primary800"
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            marginHorizontal="l"
            variant="title16black_medium"
            fontSize={18}
            color="primary800"
          >
            {value}
          </Text>
          <TouchableOpacity onPress={() => increaseValue()}>
            <Text
              variant="title12black_regular"
              fontSize={30}
              lineHeight={34}
              color="primary800"
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text variant="title16black_semibold" color="white">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  share: { marginStart: 15 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginHorizontal: "7%",
    marginTop: "5%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "57%",
  },
  plusminus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.orange,
    borderRadius: 32,
    height: 44,
    paddingHorizontal: "5%",
    alignSelf: "flex-end",
    width: "38%",
    justifyContent: "center",
  },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
    color: theme.colors.black,
  },
  line: { flexDirection: "row", alignItems: "center" },
  line2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    marginTop: "5%",
  },
  dish: {
    borderRadius: 8,
    alignSelf: "center",
    marginTop: "7%",
    height: 222,
    width: "86%",
  },
});

export default Dish;
